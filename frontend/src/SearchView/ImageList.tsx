import * as React from "react";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Image } from '../Model/ImageData';

interface ImageListProps{
    images: Image[]

}

const MasonryImageList: React.FC<ImageListProps> = ({images}) =>  {
    return (
        <Box >
      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((image) => (
          <ImageListItem key={image.url}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image.url}
                    title="green iguana"
                />
            </Card>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    )
}

export default MasonryImageList;