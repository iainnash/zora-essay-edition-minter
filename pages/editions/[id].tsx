import { Heading } from "degen";
import { useContractReads } from "wagmi";
import EditionMetadataRenderer from "@zoralabs/nft-drop-contracts/dist/artifacts/EditionMetadataRenderer.sol/EditionMetadataRenderer.json";
import DropsContract from "@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json";
import { ZORA_CREATOR_METADATA_ADDRESS } from "../../constants";
import { useRouter } from 'next/router'

const metadataContract = {
  addressOrName: ZORA_CREATOR_METADATA_ADDRESS,
  contractInterface: EditionMetadataRenderer.abi,
};

const DropsABI = DropsContract.abi;

const EditionRenderer = ({address}: {address: string}) => {
  const { error, data, isLoading } = useContractReads({
    contracts: [
      { ...metadataContract, functionName: "tokenInfos", args: [address] },
      { addressOrName: address, functionName: "name", contractInterface: DropsABI },
      {
        addressOrName: address,
        functionName: "symbol",
        contractInterface: DropsABI,
      },
    ],
  });

  return (
    <div>
      {isLoading && <Heading>loading...</Heading>}
      {JSON.stringify({ data })}
      {JSON.stringify({ error })}
    </div>
  );
}


export default function IndexPage() {

  const router = useRouter()
  const { id } = router.query

  if (id) {
    return <EditionRenderer address={id as string} />
  }
  return <div>Loading...</div>;

}
