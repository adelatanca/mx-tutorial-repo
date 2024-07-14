import {
    Address,
    AddressValue,
    ContractFunction,
    ResultsParser
  } from 'utils/sdkDappCore';
  import { smartContract } from 'utils/smartContract';
  import { useGetAccount, useGetNetworkConfig } from 'hooks/sdkDappHooks';
  import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
  
  const resultsParser = new ResultsParser();
  
  const GET_USER_BALANCE = 'getUserBalance';
  
  export const useGetBalance = () => {
    const { address } = useGetAccount();
    const { network } = useGetNetworkConfig();
  
    return async () => {
      try {
        const query = smartContract.createQuery({
          func: GET_USER_BALANCE,
          args: [new AddressValue(new Address(address))]
        });
        const provider = new ProxyNetworkProvider(network.apiAddress);
        const queryResponse = await provider.queryContract(query);
        const endpointDefinition = smartContract.getEndpoint(GET_USER_BALANCE);
        const { firstValue } = resultsParser.parseQueryResponse(
          queryResponse,
          endpointDefinition
        );
        const userBalance: string = firstValue?.valueOf()?.toString();
        return userBalance;
      } catch (err) {
        console.error(`Unable to call ${GET_USER_BALANCE}`, err);
      }
    };
  };