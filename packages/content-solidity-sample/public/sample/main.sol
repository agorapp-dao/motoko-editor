pragma solidity 0.8.10;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AgorappNFT is ERC721 {
  constructor() ERC721("Agorapp Badge","AGORA") {}
}
