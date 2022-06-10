import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
const Posts = () => {
    // loading all posts
    const [posts, setPosts] = useState([]);

    const loadUsers = () => {
        // config
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        axios.get("http://localhost:5000/posts", config).then((res) => {
            const data = res.data;
            console.log(data);
            setPosts(data);
        });
    };
    useEffect(() => {
        loadUsers();
    }, []);
    // DELETEING A SINGLE POST
    useEffect(() => {
        handleDelete();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/posts/${id}`).then((res) => {
            console.log(res);
            loadUsers();
        });
        // console.log(id);
    };
    // CREATING A POST
    // getting the values from the form
    const [data, setData] = useState({
        title: "",
        description: "",
    });
    const { title, description } = data;
    const handleChange = (e) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
        console.log(data);
    };
    // submit functionality
    const handleSubmit = (e) => {
        e.preventDefault();
        // body
        const body = JSON.stringify({
            title: title,
            description: description,
        });
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            axios
                .post(`http://localhost:5000/posts`, body, config)
                .then((res) => {
                    const postedData = res.data;
                    console.log(postedData);
                    loadUsers();
                });
            setData({ title: "", description: "" });
        } catch (error) {
            console.log(error.response);
        }
    };
    // UPDATING A POST
    const [editMode, setEditMode] = useState(false);
    console.log("before click", editMode);
    const [specificPost, setSpecificPost] = useState(null);
    const [postId, setPostId] = useState(null);

    const handleEdit = (id) => {
        setEditMode(true);
        console.log("after click", editMode);
        // console.log(id);
        const post = posts.find((p) => p._id == id);
        setSpecificPost(post);

        setPostId(id);

        // console.log("Thee post is", post);
    };
    // console.log("Thee specificPost is", specificPost && specificPost.title);
    console.log("Thee specificPost id", specificPost);

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        console.log("edit mode activated ");
        // body
        const body = JSON.stringify({
            title: title,
            description: description,
        });
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            axios
                .put(`http://localhost:5000/posts/${postId}`, body, config)
                .then((res) => {
                    console.log(res.data);
                    loadUsers();
                });
        } catch (error) {
            console.log(error.response);
        }
    };
    return (
        <div>
            <h2 style={{ textAlign: "center" }}> All posts</h2>

            <section>
                <form
                    onSubmit={editMode ? handleSubmitEdit : handleSubmit}
                    // {editMode ? "EDIT" : "CREATE"}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "400px",
                        backgroundColor: "grey",
                    }}
                >
                    <h3 style={{ textAlign: "center" }}>Create post</h3>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        defaultValue={
                            editMode ? specificPost && specificPost.title : ""
                        }
                        style={{
                            margin: "10px 15px",
                            padding: "10px",
                            outline: "none",
                        }}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        defaultValue={
                            editMode
                                ? specificPost && specificPost.description
                                : ""
                        }
                        style={{
                            margin: "10px 15px",
                            padding: "10px",
                            outline: "none",
                        }}
                    />
                    <input
                        type="submit"
                        style={{
                            margin: "10px 15px",
                            padding: "10px",
                            cursor: "pointer",
                        }}
                        value={editMode ? "EDIT" : "CREATE"}
                    />
                </form>
            </section>

            {posts &&
                posts.map((post) => (
                    <div
                        key={post._id}
                        style={{
                            borderBottom: "1px solid grey",
                            width: "600px",
                            margin: "20px auto",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <p>
                                {" "}
                                <b>Title:</b> {post.title}
                            </p>
                            <p>
                                {" "}
                                <b>Description:</b> {post.description}
                            </p>
                            <p>
                                <b>created At:</b>{" "}
                                {format(
                                    new Date(post.createdAt),
                                    "do MMM yyyy, h:mm:ss aaaaa'm'"
                                )}
                            </p>
                        </div>
                        <div>
                            <button
                                style={{
                                    margin: "0px 10px",
                                    cursor: "pointer",
                                }}
                                className="edit"
                                onClick={() => handleEdit(post._id)}
                            >
                                EDIT
                            </button>
                            <button
                                style={{
                                    margin: "0px 10px",
                                    cursor: "pointer",
                                }}
                                className="delete"
                                onClick={() => handleDelete(post._id)}
                            >
                                DEL
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Posts;
