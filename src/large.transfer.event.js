const BigNumber = require("bignumber.js");
const { Finding, FindingSeverity, FindingType } = require("forta-agent");
const {
  ERC20_TRANSFER_EVENT,
 
  BOB_Decimals,
  BoB_Address

} = require("./constants");

const AMOUNT_THRESHOLD = "1000000"; // 1 million



function provideHandleTransaction(amountThreshold) {
  return async function handleTransaction(txEvent) {
    const findings = [];

    const bobTransferEvents = txEvent.filterLog(
        ERC20_TRANSFER_EVENT,
        BoB_Address
        
      );

      bobTransferEvents.forEach((bobTransfer) => {
        // shift decimal places of transfer amount
        const amount = new BigNumber(
            bobTransfer.args.value.toString()
          ).dividedBy(10 ** BOB_Decimals);


          if (amount.isLessThan(amountThreshold)) return;

          const formattedAmount = amount.toFixed(2);

          findings.push(
            Finding.fromObject({
              name: "Large BOB Transfer",
              description: `${formattedAmount} BOB transferred`,
              alertId: "FORTA-7",
              severity: FindingSeverity.Info,
              type: FindingType.Info,
              metadata: {
                from: bobTransfer.args.from,
                to: bobTransfer.args.to,
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
        handleTransaction: provideHandleTransaction(AMOUNT_THRESHOLD),
      };
  


 
  
  


