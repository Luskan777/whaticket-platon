import React, {useState, useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile"

const useStyles = makeStyles((theme) => ({
    viewMediaInput: {
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#eee",
        position: 'relative'
      },
    viewMediaInputHeader: {
        display: "flex",
        backgroundColor: "#eee",
        width: "100%"
    },
    viewMediaInputPreview: {
        display: "flex",
        flex: 1,
        maxWidth: '100%',
        maxHeight: "100%",
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
    },
    ImagePreview: {
        width: 'auto',
        height: 'auto',
        maxWidth: '300px',  
        maxHeight: "300px",
        backgroundColor: "#eee",
        margin: "auto",
        display: "block",  
    },
    Icons: {
        color: "gray",
        height: "100px",
        width: "100px"
    },
}))


const UploadMediaInput = ({handleUploadMediaViewerClose, media}) => {
    const classes = useStyles();
    const [preview, setPreview] = useState()
        
    useEffect(() => {
        if (!media) {
            setPreview(undefined)
            return
        }
    
        const objectUrl = URL.createObjectURL(media[0])
        setPreview(objectUrl)
    
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [media])

    
    const ImageCheckFile = (file) => {
        return file.split("/")[0] === "image"
    }
    
    return(
        <>
        <div className={classes.viewMediaInputHeader} >
            <IconButton onClick={() => handleUploadMediaViewerClose([])}>
                <CancelIcon/>
            </IconButton>
        </div>
        <div className={classes.viewMediaInputPreview} >
                { preview && ImageCheckFile(media[0].type) ? (
                    <img alt="Preview"  className={classes.ImagePreview}  src={preview} />
                ) : (
                    <InsertDriveFile className={classes.Icons}  fontSize="large"  />
                )  }
        </div>
        </>

    )
}

export default UploadMediaInput