// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract LeaseContract {
    address public landlord;
    address public tenant;
    uint public deposit;
    string public mitIDHash;
    bool public signedByTenant;

    event DepositReceived(address tenant, uint amount);
    event ContractSigned(string mitIDHash);

    constructor(address _tenant, uint _deposit) payable {
        landlord = msg.sender;
        tenant = _tenant;
        deposit = _deposit;
        require(msg.value == deposit, "Send depositum");
        emit DepositReceived(_tenant, _deposit);
    }

    function signWithMitID(string memory _mitIDHash) public {
        require(msg.sender == tenant, "Kun lejer");
        require(!signedByTenant, "Allerede signeret");
        mitIDHash = _mitIDHash;
        signedByTenant = true;
        emit ContractSigned(_mitIDHash);
    }

    function releaseDeposit() public {
        require(msg.sender == landlord, "Kun udlejer");
        require(signedByTenant, "Ikke signeret");
        payable(tenant).transfer(deposit);
    }
}
