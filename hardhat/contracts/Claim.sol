// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MOJO.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Claim is Ownable {
    MOJO public mojoToken;
    uint256 public rewardAmount = 100 * 10**18; // 100 MOJO tokens, assuming 18 decimals

    mapping(address => string) public usernames;
    mapping(string => address) public usernameToAddress;

    uint256 public totalUsernamesClaimed = 0;

    event UsernameClaimed(address indexed user, string username);
    event RewardAmountUpdated(uint256 newRewardAmount);
    event TokensLoaded(uint256 amount);
    event TokensWithdrawn(uint256 amount);

    constructor(address _mojoToken) Ownable(msg.sender) {
        mojoToken = MOJO(_mojoToken);
    }

    function claimUsername(string memory _username) external {
        require(bytes(usernames[msg.sender]).length == 0, "User already claimed a username");
        require(usernameToAddress[_username] == address(0), "Username already taken");

        usernames[msg.sender] = _username;
        usernameToAddress[_username] = msg.sender;

        // Transfer 100 $MOJO tokens to the user
        require(mojoToken.balanceOf(address(this)) >= rewardAmount, "Contract does not have enough tokens");
        mojoToken.transfer(msg.sender, rewardAmount);

        totalUsernamesClaimed++;
        emit UsernameClaimed(msg.sender, _username);
    }

    // Admin function to load tokens into the contract
    function loadTokens(uint256 amount) external onlyOwner {
        mojoToken.transferFrom(msg.sender, address(this), amount);
        emit TokensLoaded(amount);
    }

    // Function to view the token balance of the contract
    function contractTokenBalance() external view returns (uint256) {
        return mojoToken.balanceOf(address(this));
    }

    // Admin function to update the reward amount
    function setRewardAmount(uint256 newRewardAmount) external onlyOwner {
        rewardAmount = newRewardAmount;
        emit RewardAmountUpdated(newRewardAmount);
    }

    // Function to check if a username is available
    function isUsernameAvailable(string memory _username) external view returns (bool) {
        return usernameToAddress[_username] == address(0);
    }

    // Function to retrieve a user's username by address
    function getUsername(address user) external view returns (string memory) {
        return usernames[user];
    }

    // Admin function to withdraw tokens from the contract
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(mojoToken.balanceOf(address(this)) >= amount, "Not enough tokens in the contract");
        mojoToken.transfer(msg.sender, amount);
        emit TokensWithdrawn(amount);
    }

    // Function to get the total number of claimed usernames
    function getTotalUsernamesClaimed() external view returns (uint256) {
        return totalUsernamesClaimed;
    }
}