import React, {useState} from 'react';

function PrescriptionUpload() {
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
        alert('test')
		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch('/uploadPrescription',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
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
			</div>
		</div>
	)
}


// function FlieUpload () {
//     const [file, setFile] = React.useState('')

//     const uploadFileHandler = async (e) => {
//         const file = e.target.files[0]
//         const formData = new FormData()
//         formData.append('File', file)
        
    
//         try {
//           const config = {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           }
    
//           const { data } = await fetch.post('/upload', formData, config)
    
//           setFile(data)
      
//         } catch (error) {
//           console.error(error)
        
//         }
//       }


//       const submitHandler = (e) => {
//         e.preventDefault()
        
     
//           updateProduct({
//             File,
//           })
//       }

//       return(
//       <div>
//       <p>Hello</p>
//       <form onSubmit={submitHandler}>
//       <label>Upload File</label>
//       <input type="file" placeholder='Enter image url' ></input> 
//         {/* onChange={(e) => setFile(e.target.value)}></input> */}

//       </form>
//       </div>
//    )
// }

export default PrescriptionUpload;