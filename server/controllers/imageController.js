import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    // Use userId from req.user set by auth middleware
    const userId = req.user?.id || req.body.userId;
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({ success: false, message: 'Insufficient credits', creditBalance: user.creditBalance });
    }

    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    const imageBuffer = Buffer.from(data, 'binary');
    const resultImage = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    // Deduct 1 credit for image generation
    await userModel.findByIdAndUpdate(user._id, { $inc: { creditBalance: -1 } });

    res.json({
      success: true,
      message: 'Image generated successfully',
      image: resultImage,
      creditBalance: user.creditBalance - 1,
    });

  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ success: false, message: 'Error generating image', error: error.message });
  }
};
