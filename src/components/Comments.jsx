import { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

const StyledFab = styled(Fab)({
  left: 90,
  marginBottom: "20px",
});

const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = async () => {
    if (!!name.trim() && !!comment.trim()) {
      await addDoc(collection(db, "comments"), {
        name,
        comment,
        timestamp: serverTimestamp(),
      });
      setName("");
      setComment("");
      setShowForm(false);
    }
  };

  const deleteComment = (id) => {
    deleteDoc(doc(db, "comments", id));
  };

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("render");
    });
  }, [setComments]);

  console.log(comments);

  return (
    <Box sx={{ mt: 23 }}>
      {!showForm ? (
        <StyledFab
          onClick={() => setShowForm(true)}
          color="secondary"
          aria-label="add"
        >
          <AddIcon />
        </StyledFab>
      ) : null}
      {showForm ? (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Name"
            value={name}
            onChange={handleName}
            variant="outlined"
            required
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Comment"
            value={comment}
            multiline
            maxRows={4}
            onChange={handleComment}
            required
          />
          <Button onClick={addComment} variant="contained">
            Post
          </Button>
        </Box>
      ) : null}
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{ p: 2, pb: 0 }}
      >
        Comments
      </Typography>
      {comments.length ? (
        <List sx={{ mb: 2 }}>
          {comments?.map(({ id, comment, name, timestamp }) => (
            <Paper key={id}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src="" />
                </ListItemAvatar>
                <ListItemText
                  sx={{ wordWrap: "break-word" }}
                  primary={name}
                  secondary={comment}
                />

                <DeleteIcon onClick={() => deleteComment(id)} sx={{ ml: 2 }} />
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ p: 2, pt: 4 }}
        >
          No comments yet. Add one
        </Typography>
      )}
    </Box>
  );
};

export default Comments;
