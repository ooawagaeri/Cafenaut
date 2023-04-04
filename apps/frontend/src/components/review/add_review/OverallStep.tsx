import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
  Text,
  Center,
} from '@chakra-ui/react';
import { storage } from '../../../services/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useDropzone } from 'react-dropzone';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
import { Key, useEffect, useState } from 'react';

export function OverallStep({ setReview }: { setReview: any }) {
  const thumbsContainer = {
    display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    marginTop: 16,
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    // boxSizing: 'border-box'
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  };

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
  };

  let images_url: string[] = [];
  const [files, setFiles] = useState<any>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      acceptedFiles.map((file) => {
        const storageRef = ref(storage, `files/${file.name}`);
        console.log(storageRef);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setReview((review: any) => {
                const newReview = { ...review };
                images_url.push(downloadURL);
                newReview.image_url = images_url;
                return newReview;
              });
            });
          }
        );
      });
    },
  });

  const thumbs = files.map(
    (file: { name: Key | null | undefined; preview: string }) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    )
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: { name: Key | null | undefined; preview: string }) =>
        URL.revokeObjectURL(file.preview)
      );
  }, []);

  return (
    <Box padding="5%">
      <FormControl as="fieldset">
        <FormLabel>Review Title</FormLabel>
        <Input
          onChange={(e) => {
            setReview((review: ReviewModel) => {
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
        <Text as="b">Images</Text>
        <section className="container">
          <Center
            borderWidth="1px"
            borderRadius="lg"
            height={'50px'}
            {...getRootProps({ className: 'dropzone' })}
          >
            <input {...getInputProps()} />
            <Text>
              Drag 'n' drop some images here, or click to select images
            </Text>
          </Center>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
      </FormControl>
    </Box>
  );
}
