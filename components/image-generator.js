
export function makeSVGCard(title, desc) {
  return `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1296 720">
  <style type="text/css">
    .st0{fill:#FFFFFF;stroke:#FBB040;stroke-width:6;stroke-miterlimit:10;}
    .st1{fill:none;}
    .st2{font-family:'Helvetica';}
    .st3{font-size:47px;}
    .st4{font-size:112px;}
    .st5{fill:none;stroke:#2E3192;stroke-width:13;stroke-miterlimit:10;}
  </style>
    <g>
      <path class="st0" d="M1213.2,706H81.3c-39.5,0-71.8-32.3-71.8-71.8V81.5C9.5,42,41.8,9.7,81.3,9.7h1131.9 c39.5,0,71.8,32.3,71.8,71.8v552.7C1285,673.7,1252.7,706,1213.2,706z"/>
      <rect x="165" y="377.7" class="st1" width="965.6" height="299.3"/>
      <text transform="matrix(1 0 0 1 216.7256 411.4629)">${desc}</text>
      <rect x="70.1" y="15.1" class="st1" width="1145.1" height="252.8"/>
      <text transform="matrix(1 0 0 1 455.8662 181.8223)" class="st2 st4">${title}</text>
      <line class="st5" x1="231.6" y1="271.7" x2="1070" y2="271.7"/>
    </g>
    </svg>
  `;
}