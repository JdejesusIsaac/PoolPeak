const BigNumber = require("bignumber.js");
const { Finding, FindingSeverity, FindingType } = require("forta-agent");

const {
    ERC20_TRANSFER_FROM_FUNCTION,
   
    BOB_Decimals,
    BoB_Address
  
  } = require("./constants");

const AMOUNT_THRESHOLD = "1000000"; // 1 million

function provideHandleTransaction() {
    return async function handleTransaction(txEvent) {
      const findings = [];
  
      // filter the transaction input for USDT transferFrom function calls
      const BoBTransferFromInvocations = txEvent.filterFunction(
        ERC20_TRANSFER_FROM_FUNCTION,
        BoB_Address
      );
  
      // fire alerts for each function call
      BoBTransferFromInvocations.forEach((transferFromInvocation) => {
        // shift decimal places of transfer amount
        const amount = new BigNumber(
          transferFromInvocation.args.value.toString()
        ).dividedBy(10 ** BOB_Decimals);
  
        const formattedAmount = amount.toFixed(2);
        findings.push(
          Finding.fromObject({
            name: "BOB Delegate Transfer",
            description: `${formattedAmount} BOB transferred`,
            alertId: "FORTA-8",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: {
              by: txEvent.from,
              from: transferFromInvocation.args.from,
              to: transferFromInvocation.args.to,
              amount: formattedAmount,
            },
          })
        );
      });
  
      return findings;
    };
  }
  
  module.exports = {
    provideHandleTransaction,
    handleTransaction: provideHandleTransaction(),
  };