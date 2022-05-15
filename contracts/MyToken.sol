pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import './ERC20Mintable.sol';

contract MyToken is ERC20, ERC20Mintable {
    constructor(uint256 amount) ERC20("Starbucks Cappucino Token", "CAPPU") {
        //Mint fixed supply tokens
        //_mint(msg.sender, initialSupply);

        mint(msg.sender, amount);
    }
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
}