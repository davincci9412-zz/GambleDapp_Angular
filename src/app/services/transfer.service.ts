import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  
  chainID: any;
  address: any;

  constructor(private router: Router) {
    
  }

  async connectETH () {
    try {
      if (window.ethereum === undefined) {
        window.open("https://metamask.io/download.html");
      } else {
        this.chainID = window.ethereum.chainId;
        if (window.ethereum.isConnected()) {
          let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (Array.isArray(accounts)){
            this.address = accounts[0];
            sessionStorage.setItem('address', this.address)
            sessionStorage.setItem('chainID', this.chainID)    
            this.signETH(this.address, this.chainID);
            
          } 
        } else {
          alert("ETH connection failed. Please try it again")
          /*
          interface ConnectInfo {
            chainId: string;
          }            
          window.ethereum.on('connect', handler:(connectInfo: ConnectInfo) => void);
          */
          window.ethereum.on('connect', this.chainID);
        }                   
      }        
    } catch (error) {
      console.error(error);
    }
  };

  async signETH (address: any, chainID: any) {

    let message='Welcome to our site\n\n Click "Sign" to sign in. No password needed!\n\nI accept this Term of Service \n\nWallet address:\n '+ address;
    let params =[address, message, chainID]
    //const promise = window.ethereum.request({ method: 'personal_sign', params:params, }).toPromise();
    //let params =[this.address,this.address,this.chainID]
    //let signedAccount = await window.ethereum.request({method: 'personal_sign', params,})
    //if (signedAccount)    sessionStorage.setItem('hash', signedAccount)
    
    await window.ethereum.request({method: 'personal_sign', params,}).then((result: any) => {
      // The result varies by by RPC method.
      // For example, this method will return a transaction hash hexadecimal string on success.
      sessionStorage.setItem('hash', result)
      this.router.navigate(["/setting"]).then(() => { window.location.reload();})
    })
    .catch((error: any) => {
      // If the request fails, the Promise will reject with an error.
      sessionStorage.setItem('hash', error)
    });
         
  };

  getInformation(signedAccount: any){
    
  }

}
