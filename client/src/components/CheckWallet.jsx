import { Tezos, RpcForger } from '@taquito/taquito';
import { ThanosWallet } from '@thanos-wallet/dapp';

import React, { useState, useEffect }from "react";



const CheackWallet = () => {



    useEffect(() => {
      async function check () {
        try {
          const available = await ThanosWallet.isAvailable();
          if (!available) {
            throw new Error('Thanos Wallet not installed');
          }
        } catch (err) {
          console.log(err);
        }
      }
        
      });
}

export default CheckWallet;
    
    