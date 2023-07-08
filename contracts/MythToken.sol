// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface Myth {
    function startGame(uint256[] memory ids, uint256[] memory amounts) external;

    function endGame(uint256[] memory ids, uint256[] memory amounts) external;
}

contract MythArena {
    Myth myth;

    struct Game {
        address player1;
        address player2;
        uint256 solution1;
        uint256 solution2;
        uint256[] guesses1;
        uint256[] guesses2;
        address winner;
    }
    mapping(uint256 => Game) games;

    constructor(address _mythAddress) {
        myth = Myth(_mythAddress);
    }

    function startGame(uint256[] memory ids) public {
        require(ids.length == 5, "An error occured");
        uint256[] memory amounts;
        for (uint256 i = 0; i < 6; ++i) {
            amounts[i] = 1;
        }
        myth.startGame(ids, amounts);
    }
}
