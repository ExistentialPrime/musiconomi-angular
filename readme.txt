=============================================
Musicoin Cointek
Author: CryptoPete (thecryptopete@gmail.com)

Cointek is an open-source endeaver to build a platform to allow people without crypto-skills to purchase Musicoin without having to go through the hassle of signing up for exchanges and messing with wallets. We want to provide a simple place for them to quickly and easily buy Musicoin with fiat and have it automatically sent to their Musicoin.org account for consumption.
=============================================

Development Environment Setup
---------------------------------------------
1. Clone Repository to local

2. Make sure Node.js 7.x, NPM 4.x, and Bower 1.8.x are installed  

3. Get dependencies
 - Navigate to the root of the project and run 'npm install'
 - Navigate to the root of the project and run 'bower install'

4. Build the project 
 - Navigate to the root of the project and run 'npm run build'

5. Run the project 
 - Navigate to the root of the project and run 'npm start'


Production Server Requirements (Commands for Ubuntu): 
----------------------------------------------------------------
 - Apache2 (if not installed run 'sudo apt install apache2' - config is up to you)
 - Node.js 7.x (if not installed run 'curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash - ' then 'sudo apt-get install -y nodejs')
 - NPM 4.x (if not installed run 'sudo apt-get install npm')
 - Bower 1.8.x (if not installed run 'npm install -g bower')