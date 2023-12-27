import User from "../Models/User.js";
// READ
export const getUser = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const searchFriends = async(req, res) => {
  try {
    if (req.query.search){
      const users = await User.find();
      const searchStr = req.query.search.toLowerCase();
      const filterFriends = users.filter((friend) => friend.firstName.toLowerCase().includes(searchStr));
      return res.status(201).json(filterFriends);
    }
    res.status(200).json([]);

  } catch (error) {
    console.log("Code Phatt Gaya");
    res.status(500).json({message: "Internal Sever Error!"});
  }
}

export const getFriends = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
  
      if (friends.length === 0) {
        return res.status(200).json({ message: "You have 0 Friends!" });
      }

      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
      );
  
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };
  

export const addRemoveFriend = async(req, res) => {
    try{
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )
        res.status(200).json(formattedFriends);
    }
    catch(err) {
        res.status(404).json({error: err.message});
    }
}