import React, {useState} from 'react';

function FlieUpload() {
	// const [selectedFile, setSelectedFile] = useState();
	// const [isSelected, setIsSelected] = useState(false);

	// const changeHandler = (event) => {
	// 	setSelectedFile(event.target.files[0]);
	// 	setIsSelected(true);
	// };

	// const handleSubmission = () => {
    //     alert('test')
	// 	const formData = new FormData();

	// 	formData.append('File', selectedFile);

	// 	fetch('/uploadPrescription',
	// 		{
	// 			method: 'POST',
	// 			body: formData,
	// 		}
	// 	)
	// 		.then((response) => response.json())
	// 		.then((result) => {
	// 			console.log('Success:', result);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error:', error);
	// 		});
	// };
	

	return(
   <div>
       <form action="/uploadPrescription" enctype="multipart/form-data" method="POST">
      
        <span>Upload Profile Picture:</span>  
        <input type="file" name="mypic" required/> <br />
        <input type="submit" value="submit" /> 
    </form>
    
			{/* <input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div> */}
            </div>
		
	)
}


export default FlieUpload;