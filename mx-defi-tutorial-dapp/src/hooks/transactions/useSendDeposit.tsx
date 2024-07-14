import { Address } from '@multiversx/sdk-core';
import { smartContract } from 'utils/smartContract';
import { getChainId } from 'utils/getChainId';
import { refreshAccount, sendTransactions } from 'helpers/sdkDappHelpers';
import { RouteNamesEnum } from 'localConstants';
import { useGetAccount } from 'hooks/sdkDappHooks';

export const useSendDeposit = () => {
  const { address } = useGetAccount();

  return async (amount: string) => {
    const depositTransaction = smartContract.methodsExplicit
      .deposit()
      .withValue(amount)
      .withGasLimit(60000000)
      .withSender(new Address(address))
      .withChainID(getChainId())
      .buildTransaction();

    await refreshAccount();

    await sendTransactions({
      transactions: [depositTransaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Deposit transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Deposit successful'
      },
      redirectAfterSign: false,
      callbackRoute: RouteNamesEnum.dashboard
    });
  };
};