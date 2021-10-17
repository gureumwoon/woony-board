import Post from "../models/Post"
import moment from "moment";

export const home = async (req, res) => {
    const posts = await Post.find({})
        .sort({ createdAt: "desc" })
    console.log(posts);
    return res.render("home", { pageTitle: "Home", posts, moment })
};
export const watch = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    return res.render("watch", { pageTitle: `Watching`, post });
};
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
        return res.send("Post not found")
    }
    return res.render("edit", { pageTitle: `Edit`, post });
}
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    const post = await Post.exists({ _id: id });
    if (!post) {
        return res.send("Post not found")
    }
    await Post.findByIdAndUpdate(id, {
        title,
        body,
    });
    return res.redirect(`/boards/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Board" });
}
export const postUpload = async (req, res) => {
    const { title, body } = req.body;
    await Post.create({
        title,
        body,
    });
    return res.redirect("/");
};

export const deleteBoard = async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    let posts = [];
    if (keyword) {
        posts = await Post.find({
            title: {
                $regex: new RegExp(keyword, "i")
            },
        });
    }
    return res.render("search", { pageTitle: "Search", posts, moment });
}