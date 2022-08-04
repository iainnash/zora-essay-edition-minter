import { MarkdownEditor } from "../components/markdown-editor";
import { useState, useCallback, useMemo } from "react";
import { Box, Button, Heading, Input } from "degen";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { makeSVGCard } from "../components/image-generator";
import { useAccount, useContract, useProvider, useSigner} from "wagmi";
import type {IERC721Drop} from '@zoralabs/nft-drop-contracts/dist/typechain/ZoraNFTCreatorV1';
import { ZORA_CREATOR_CONTRACT_ADDRESS } from "../constants";
import { parseEther } from "ethers/lib/utils";
import ZoraCreatorABI from '@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json'

function getSalesConfig(): IERC721Drop.SalesConfigurationStruct {
  return {
    // 0.1 eth sales price
    publicSalePrice: parseEther('0.1'),
    // Sets 100 purchases per address
    maxSalePurchasePerAddress: 100,
    publicSaleStart: 0,
    // Sets the sale to last a week: 60 seconds -> minute 60 -> mins hour -> 24 hours in a day -> 7 days in a week
    publicSaleEnd: Math.floor(new Date().getTime()/1000) + 7*24*60*60,
    // Disables presale
    presaleStart: 0,
    presaleEnd: 0,
    presaleMerkleRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
  }
}

export default function CreatePage() {
  // content for essay, title, and description
  const [essay, setEssay] = useState("## My essay\n\nWrite here");
  const [title, setTitle] = useState("My title");
  const [description, setDescription] = useState("Tagline");
  // disable button when publishing edition
  const [publishing, setPublishing] = useState(false);

  // WAGMI (hooks for ethereum)
  const { address, isConnected } = useAccount()
  const signer = useSigner();
  const provider = useProvider();

  // Connects the zora contracts with WAGMI
  const contract = useContract({
    addressOrName: ZORA_CREATOR_CONTRACT_ADDRESS,
    contractInterface: ZoraCreatorABI.abi,
    signerOrProvider: signer.data || provider,
  })

  const upload = useCallback(async () => {
    setPublishing(true);
    const essayHTML = document!.querySelector(".md-editor-preview")!.innerHTML;
    const publishRequest = await fetch("/api/publish", {
      method: "post",
      body: JSON.stringify({
        essay: essayHTML,
        title,
        description,
      }),
    });
    const response = await publishRequest.json();

    const imageIPFS = response.imageCID.IpfsHash;
    const contentIPFS = response.essayCID.IpfsHash;

    console.log({imageIPFS, contentIPFS})

    await contract.createEdition(
      title,
      title.toUpperCase().replace(/^[A-Za-z0-9]/g, '').substring(0, 8),
      100, // edition size
      1000, // 10%,
      address!,
      address!,
      getSalesConfig(),
      description,
      `ipfs://${contentIPFS}`,
      `ipfs://${imageIPFS}`
    );

    setPublishing(false);
  }, [essay, title, description, address, signer]);

  return (
    <div>
      {isConnected&& <ConnectButton />}
     
      <Heading>Title Card Config</Heading>
      {/* <img src={svg} /> */}
      <div style={{ maxWidth: "40%" }}>
        <div
          dangerouslySetInnerHTML={{ __html: makeSVGCard(title, description) }}
        />
      </div>
      <Input
        label="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <Input
        label="Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <Box marginBottom="2" />
      <Heading>Write your essay:</Heading>
      <MarkdownEditor
        onChange={setEssay}
        value={essay}
        visible={true}
        preview="live"
        height={400}
      />
      {isConnected ? (
      <Button disabled={publishing} onClick={upload}>
        {publishing ? "publishing..." : "Publish!"}
      </Button>

      ) : (
        <ConnectButton />
      )}
    </div>
  );
}
