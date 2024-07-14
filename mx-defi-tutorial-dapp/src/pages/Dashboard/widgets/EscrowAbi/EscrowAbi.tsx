import { useEffect, useState } from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TokenTransfer } from '@multiversx/sdk-core';
import { Button } from 'components/Button';
import { ContractAddress } from 'components/ContractAddress';
import { OutputContainer } from 'components/OutputContainer';
import {
  useGetAccountInfo,
  useSendDeposit,
  useSendWithdraw,
  useGetBalance,
  useGetNetworkConfig
} from 'hooks';
import { FormatAmount, Label } from 'components';
import { formatAmount } from '@multiversx/sdk-dapp/utils/operations/formatAmount';


export const EscrowAbi = () => {
  const { network } = useGetNetworkConfig();
  const sendDeposit = useSendDeposit();
  const sendWithdraw = useSendWithdraw();
  const getBalance = useGetBalance();
  const { websocketEvent } = useGetAccountInfo();
  const [balance, setBalance] = useState<string>();

  const fetchBalance = async () => {
    const balance = await getBalance();
    setBalance(balance);
  };

  useEffect(() => {
    fetchBalance();
  }, [websocketEvent]);

  const onDeposit = async () => {
    if (
      window.confirm(`Are you sure you want to deposit 1 ${network.egldLabel}`)
    ) {
      await sendDeposit(TokenTransfer.egldFromAmount('1').toString());
    }
  };

  const onWithdraw = async () => {
    const amount = balance ? formatAmount({ input: balance }) : '…';
    if (
      window.confirm(
        `Are you sure you want to withdraw ${amount} ${network.egldLabel}?`
      )
    ) {
      await sendWithdraw();
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-start gap-2'>
          <Button
            onClick={onDeposit}
            className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
          >
            <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
            Deposit
          </Button>

          <Button
            disabled={balance === '0'}
            onClick={onWithdraw}
            className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
          >
            <FontAwesomeIcon icon={faArrowDown} className='mr-1' />
            Withdraw
          </Button>
        </div>
      </div>

      <OutputContainer>
        <ContractAddress />
        <p>
          <Label>Escrow Balance:</Label>{' '}
          {balance ? (
            <FormatAmount value={balance} egldLabel={network.egldLabel} />
          ) : (
            'Loading…'
          )}
        </p>
      </OutputContainer>
    </div>
  );
};