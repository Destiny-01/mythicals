// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IERC20 {
    function tokenInitialMint(address receiver) external;

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract Myth is ERC1155, Ownable {
    IERC20 private mythToken;
    struct Game {
        address player1;
        address player2;
        uint256 solution1;
        uint256 solution2;
        uint256[] guesses1;
        uint256[] guesses2;
        address winner;
    }
    enum GameAction {
        Start,
        Join
    }
    mapping(address => bool) hasMinted;
    mapping(uint256 => Game) games;

    constructor(
        string memory initialURI,
        address _mythToken
    ) ERC1155(initialURI) {
        mythToken = IERC20(_mythToken);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function initialMint() public {
        require(!hasMinted[msg.sender], "You have claimed your welcome bonus");
        uint256[] memory ids = convertToUint256Array(
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        );
        uint256[] memory amounts = convertToUint256Array(
            [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        );

        mythToken.tokenInitialMint(msg.sender);
        _mintBatch(msg.sender, ids, amounts, "");
        hasMinted[msg.sender] = true;
    }

    function buyEggs(uint256[] memory ids, uint256[] memory amounts) public {
        uint256 totalAmount;
        for (uint256 i = 0; i < ids.length; ++i) {
            totalAmount += amounts[i];
        }

        mythToken.transferFrom(msg.sender, address(this), totalAmount);
        _mintBatch(msg.sender, ids, amounts, "");
    }

    function initGame(
        uint256 gameId,
        uint256[] memory ids,
        GameAction action
    ) public {
        uint256[] memory amounts = new uint256[](5);
        for (uint256 i = 0; i < 5; ++i) {
            amounts[i] = uint256(1);
        }

        if (action == GameAction.Start) {
            require(games[gameId].player1 == address(0), "Game code in use");
            games[gameId].player1 = msg.sender;
        } else if (action == GameAction.Join) {
            require(
                games[gameId].player2 == address(0) &&
                    games[gameId].player1 != address(0),
                "Invalid game code"
            );
            games[gameId].player2 = msg.sender;
        } else {
            revert("An error occured");
        }

        _safeBatchTransferFrom(msg.sender, address(this), ids, amounts, "");
    }

    function wonGame(
        uint256 gameId,
        uint256[] memory ids,
        Game memory game
    ) public {
        require(
            games[gameId].player1 == msg.sender ||
                games[gameId].player2 == msg.sender,
            "You did not play this game"
        );
        require(game.winner == msg.sender, "You are not the winner");
        require(
            games[gameId].player1 != address(0) &&
                games[gameId].player2 != address(0),
            "This game is invalid"
        );

        games[gameId] = game;
        uint256[] memory amounts = new uint256[](5);
        for (uint256 i = 0; i < 5; ++i) {
            amounts[i] = uint256(1);
        }
        _mintBatch(msg.sender, ids, amounts, "");
    }

    function uri(
        uint256 _tokenid
    ) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://ipfs.io/ipfs/bafybeihzqbmf7v5qynfvdpuaeuwm7h3vforh5avfccsq5h5joqy5mkm7dq/",
                    Strings.toString(_tokenid),
                    ".json"
                )
            );
    }

    function convertToUint256Array(
        uint8[10] memory numbers
    ) internal pure returns (uint256[] memory) {
        uint256[] memory result = new uint256[](numbers.length);

        for (uint256 i = 0; i < numbers.length; i++) {
            result[i] = uint256(numbers[i]);
        }

        return result;
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
