

exports.get_data =async (req,res,next) =>{
	const { Gateway, Wallets } = require('fabric-network');
	const path = require('path');
	const fs = require('fs');
	console.log("Inside Get Data");
	console.log(req.params.ID)
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'config', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd() ,'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser1');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser1', discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel12');
    
        // Get the contract from the network.
        const contract = network.getContract('doctor');

        // Evaluate the specified transaction.

        const result = await contract.evaluateTransaction('readDoctor',req.params.ID);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
	
        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({
			message : JSON.parse(result.toString())
		})
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
		res.status(500).json({
			message: error.toString()
		})
        // process.exit(1);
    }
}

exports.get_all_data =async (req,res,next) =>{
	const { Gateway, Wallets } = require('fabric-network');
	const path = require('path');
	const fs = require('fs');
	console.log("Inside Get Data");
	console.log(req.params.ID)
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'config', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd() ,'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser1');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser1', discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel12');
    
        // Get the contract from the network.
        const contract = network.getContract('doctor');

        // Evaluate the specified transaction.

        const result = await contract.evaluateTransaction('queryDoctors');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
	
        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({
			message : JSON.parse(result.toString())
		})
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
		res.status(500).json({
			message: error.toString()
		})
        // process.exit(1);
    }
}

exports.get_history_data =async (req,res,next) =>{
	const { Gateway, Wallets } = require('fabric-network');
	const path = require('path');
	const fs = require('fs');
	console.log("Inside Get Data");
	console.log(req.params.ID)
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'config', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd() ,'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser1');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser1', discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel12');
    
        // Get the contract from the network.
        const contract = network.getContract('doctor');

        // Evaluate the specified transaction.

        const result = await contract.evaluateTransaction('getHistoryFordoctor',req.params.ID);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
	
        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({
			message : JSON.parse(result.toString())
		})
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
		res.status(500).json({
			message: error.toString()
		})
        // process.exit(1);
    }
}

exports.load_data =async (req, res, next) => {
	const { Gateway, Wallets } = require('fabric-network');
	const fs = require('fs');
	const path = require('path');

	try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'config', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser1');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser1', discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel12');

        // Get the contract from the network.
        const contract = network.getContract('doctor');

        // Submit the specified transaction.

        await contract.submitTransaction('initDoctor', req.body.doctor_id,req.body.first_name,req.body.last_name,req.body.license_id,req.body.date_of_birth,req.body.gender,req.body.address,req.body.contact_number,req.body.email);
        console.log('Transaction has been submitted');
		res.status(200).json({
			message:"Transaction has been submitted"
		})

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
		res.status(500).json({
			message: error.toString()
		})
        // process.exit(1);
    }
}


exports.assign_patient =async (req, res, next) => {
	const { Gateway, Wallets } = require('fabric-network');
	const fs = require('fs');
	const path = require('path');

	try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'config', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser1');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser1', discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel12');

        // Get the contract from the network.
        const contract = network.getContract('doctor');

        // Submit the specified transaction.

        await contract.submitTransaction('addPatient', req.body.doctor_id,req.body.patient_id);
        console.log('Transaction has been submitted');
		res.status(200).json({
			message:"Transaction has been submitted"
		})

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
		res.status(500).json({
			message: error.toString()
		})
        // process.exit(1);
    }
}

exports.delete_data =async (req, res, next) => {
	const { Gateway, Wallets } = require('fabric-network');
	const fs = require('fs');
	const path = require('path');

	try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'config', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser1');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser1', discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel12');

        // Get the contract from the network.
        const contract = network.getContract('doctor');

        // Submit the specified transaction.

        await contract.submitTransaction('delete', req.params.ID);
        console.log('Transaction has been Deleted');
		res.status(200).json({
			message:"Transaction has been Deleted"
		})

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
		res.status(500).json({
			message: error.toString()
		})
        // process.exit(1);
    }
}




