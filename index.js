require('dotenv').config();
const { Web3Storage, getFilesFromPath } = require('web3.storage');

const initWeb3 = () => {
  console.log({ token: process.env.WEB3_STORAGE_TOKEN })

  const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN })
  return client;
}

const putFiles = async () => {
  try {
    const client = initWeb3();
    const getFiles = await getFilesFromPath('./');
    const rootCID = await client.put(getFiles, { name: 'Files Demo' });
    console.log({ rootCID })

    const result = await client.get(rootCID);
    console.log({ result })

    if(result.ok) {
      const files = await result.files();
      console.log({ files })
    }

  } catch(err) {
    console.error(err)
  } finally {
    process.exit(0)
  }
}

putFiles()

const retrieveFiles = async (cid = '') => {
  const client = initWeb3();
  const result = await client.get(cid);
  const files = await result.files();
  console.log({ files })

  for(const file of files) {
    console.log(`${file.cid} ${file.name} ${file.size}`);
  }
  
  process.exit(0)
}

// retrieveFiles();
