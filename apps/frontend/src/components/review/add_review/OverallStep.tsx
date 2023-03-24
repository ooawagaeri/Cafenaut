import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
  Button,
  Text,
} from '@chakra-ui/react';
import { storage } from '../../../services/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

export function OverallStep({ setReview }: { setReview: any }) {
  const [imgUrl, setImgUrl] = useState('');
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setReview((review: any) => {
            const newReview = { ...review };
            newReview.image_url = downloadURL;
            return newReview;
          });
        });
      }
    );
  };

  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <FormLabel>Review Title</FormLabel>
        <Input
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.title = e.target.value;
              return newReview;
            });
          }}
          type="vibe-free-text"
        />
        <FormLabel paddingTop={'2%'}>Overall Thoughts</FormLabel>
        <Textarea
          onChange={(e) => {
            setReview((review: any) => {
              const newReview = { ...review };
              newReview.body = e.target.value;
              return newReview;
            });
          }}
        />
        <br></br>
        <br></br>
        <Text>Images</Text>
        <form onSubmit={handleSubmit} className="form">
          <Input type="file" />
          <Button type="submit">Upload your image!</Button>
        </form>
        <br></br>
        {imgUrl !== '' && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progresspercent}%` }}>
              Upload: {progresspercent}%
            </div>
          </div>
        )}
        {imgUrl !== '' && <img src={imgUrl} alt="uploaded file" height={200} />}
      </FormControl>
    </Box>
  );
}
