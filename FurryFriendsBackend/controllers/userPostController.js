import UserPost from "../model/userPost.js";
import User from "../model/user.js";
import { v2 as cloudinary } from "cloudinary";
import { extractPublicIdFromUrl } from "../controllers/uploadController.js";


/**
 * ✅ Create a new user post
 */
export const createUserPost = async (req, res) => {
  try {
    const { title, content, petTag, media, mediaType } = req.body;

    // Validate that at least content or media is provided
    if (!content && !media) {
      return res
        .status(400)
        .json({ error: "Either content or media is required." });
    }

    const newPost = new UserPost({
      user: req.user.id,
      title, // new field from the form
      content,
      petTag, // new field from the form
      media: media || "",
      mediaType: mediaType || "text",
    });

    await newPost.save();
    await User.findByIdAndUpdate(req.user.id, {
      $push: { posts: newPost._id },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("User Post Creation Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



/**
 * ✅ Get all posts of a user
 */
export const getUserPosts = async (req, res) => {
  try {
    const posts = await UserPost.find({ user: req.params.userId })
      .populate("user", "username profile.profilePicture")
      .populate("comments.user", "username profile.profilePicture")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Fetch Posts Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


/**
 * ✅ Like a user post
 */
export const likeUserPost = async (req, res) => {
  try {
    const post = await UserPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res
      .status(200)
      .json({ message: "Like status updated", likes: post.likes.length });
  } catch (error) {
    console.error("Like Post Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * ✅ Add a comment to a user post
 */
export const addUserPostComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await UserPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({ user: req.user.id, text });
    await post.save();

    // Populate comment user details
    await post.populate("comments.user", "username profile.profilePicture");

    res
      .status(200)
      .json({ message: "Comment added successfully", comments: post.comments });
  } catch (error) {
    console.error("Comment Post Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUserPost = async (req, res) => {
  try {
    const post = await UserPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Ensure that only the owner can delete the post
    if (post.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this post" });
    }

    // If there's media, attempt to delete it from Cloudinary
    if (post.media) {
      const publicId = extractPublicIdFromUrl(post.media);
      if (publicId) {
        const resourceType = post.mediaType === "video" ? "video" : "image";
        await cloudinary.uploader.destroy(publicId, {
          resource_type: resourceType,
        });
      }
    }

    // Use deleteOne() instead of remove()
    await post.deleteOne();

    // Remove the post reference from the user's posts array
    await User.findByIdAndUpdate(req.user.id, { $pull: { posts: post._id } });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

