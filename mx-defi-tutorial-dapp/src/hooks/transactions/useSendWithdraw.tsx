import { Address } from '@multiversx/sdk-core';
import { smartContract } from 'utils/smartContract';
import { getChainId } from 'utils/getChainId';
import { refreshAccount, sendTransactions } from 'helpers/sdkDappHelpers';
import { RouteNamesEnum } from 'localConstants';
import { useGetAccount } from 'hooks/sdkDappHooks';

export const useSendWithdraw = () => {
  const { address } = useGetAccount();

  return async () => {
    const withdrawTransaction = smartContract.methods
      .withdraw()
      .withGasLimit(60000000)
      .withSender(new Address(address))
      .withChainID(getChainId())
      .buildTransaction();

    await refreshAccount();

    await sendTransactions({
      transactions: [withdrawTransaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing withdraw transaction',
        errorMessage: 'An error has occured during withdrawal',
        successMessage: 'Withdrawal successful'
      },
      redirectAfterSign: false,
      callbackRoute: RouteNamesEnum.dashboard
    });
  };
};