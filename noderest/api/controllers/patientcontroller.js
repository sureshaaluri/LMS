

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
        const contract = network.getContract('patient');

        // Evaluate the specified transaction.

        const result = await contract.evaluateTransaction('readPatient',req.params.ID);
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
        const contract = network.getContract('patient');

        // Evaluate the specified transaction.

        const result = await contract.evaluateTransaction('getHistoryForPatient',req.params.ID);
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
        const contract = network.getContract('patient');

        // Submit the specified transaction.

        await contract.submitTransaction('initPatient', req.body.patient_id,req.body.first_name,req.body.last_name,req.body.country_of_residence,req.body.date_of_birth,req.body.gender,req.body.weight,req.body.address,req.body.contact_number,req.body.patient_medical_details);
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

exports.init_insurance =async (req, res, next) => {
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
        const contract = network.getContract('patient');

        // Submit the specified transaction.

        await contract.submitTransaction('initInsurance', req.body.patient_id,req.body.insurance_company_name,req.body.policy_number);
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

exports.grant_consent =async (req, res, next) => {
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
        const contract = network.getContract('patient');

        // Submit the specified transaction.

        await contract.submitTransaction('grantConsent', req.body.patient_id,req.body.access_did,req.body.consent);
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

exports.init_prescription =async (req, res, next) => {
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
        const contract = network.getContract('patient');

        // Submit the specified transaction.

        await contract.submitTransaction('initPrescription', req.body.patient_id,req.body.prescription_did,req.body.access_did,req.body.consent,req.body.diagnosis_info,req.body.prescription_info);
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
        const contract = network.getContract('patient');

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




