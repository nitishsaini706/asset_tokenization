pragma solidity >=0.6.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract MyTOken is ERC20,ERC20Detailed {

    constructor(uint initialSupply) ERC20Detailed("StarDucks Cappucino Token" , "CAPPU" , 0) public{
        _mint(msg.sender,initialSupply);
    }
}