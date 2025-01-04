import React, {useEffect, useState, useContext} from "react";
import {
  useTheme,
  Card,
  IconButton,
  Badge,
  Avatar,
  Text,
} from "react-native-paper";
import {View, StyleSheet} from "react-native";
import PostIconButtons from "../components/PostIconButtons";
import ModifyPostContext from "../context/ModifyPostContext";

const PostHomeCard = ({item}) => {
  const {colors} = useTheme(); // Get the colors from the theme
  const [commentsWithUserData, setCommentsWithUserData] = useState([]);
  const [showClothes, setShowClothes] = useState(false);
  const [post, setPost] = useState(item);
  const {fetchUserData, likePost, unlikePost} = useContext(ModifyPostContext);
  // this useEffect have the logic to create a valid object with all the comments and his data that the post have.
  useEffect(() => {
    const fetchCommentsUserData = async () => {
      const commentsWithUserData = await Promise.all(
        item.comments.map(async (comment) => {
          const userData = await fetchUserData(comment.userId);
          return {...comment, userData};
        })
      );
      setCommentsWithUserData(commentsWithUserData);
    };

    fetchCommentsUserData();
  }, [item.comments, fetchUserData]);

  const handleLikePost = async () => {
    const updatedPost = await likePost(item._id);
    console.log(item._id);
    console.log(updatedPost.likes);
    if (updatedPost) {
      setPost(updatedPost);
    }
  };

  const handleUnlikePost = async () => {
    const updatedPost = await unlikePost(item._id);
    if (updatedPost) {
      setPost(updatedPost);
    }
  };
  return (
    <Card style={styles.card}>
      <View style={{position: "relative"}}>
        <Card.Title
          title={item.userId.username}
          titleStyle={{color: colors.text, fontWeight: "bold"}}
          style={[{backgroundColor: colors.primaryContainer}, styles.cardTitle]}
          left={() => (
            <Avatar.Image
              size={50}
              source={{
                uri: item.userId.profilePicture,
              }}
            />
          )}
        />
        <Card.Content
          style={[
            {backgroundColor: colors.primaryContainer},
            styles.cardDescription,
          ]}
        >
          <Text variant="titleMedium" style={{color: colors.text}}>
            {item.title}
          </Text>
          <Text variant="bodyMedium" style={{color: colors.text}}>
            {item.description}
          </Text>
        </Card.Content>
        <Card.Cover
          source={{uri: item.imageUrl}}
          resizeMode="contain"
          style={styles.image}
        />
        <Card.Content
          style={[
            {backgroundColor: colors.primaryContainer},
            styles.cardButtonsContainer,
          ]}
        >
          <PostIconButtons
            post={post}
            userId={item.userId._id}
            comments={commentsWithUserData}
            onLike={handleLikePost}
            onUnlike={handleUnlikePost}
          />
        </Card.Content>

        <IconButton
          icon="tshirt-crew"
          iconColor={colors.primary}
          mode="contained-tonal"
          size={15}
          // onPress={() => console.log("Pressed")}
          style={styles.icon}
        />
        <Badge
          style={[
            styles.badge,
            {
              color: colors.onPrimaryContainer,
              backgroundColor: colors.primaryContainer,
            },
          ]}
          size={16}
        >
          {item.clothes.length}
        </Badge>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 320,
    marginBottom: 40,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
  icon: {
    position: "absolute",
    left: 228,
    bottom: 50,
  },
  badge: {
    position: "absolute",
    left: 250,
    bottom: 75,
  },
  image: {
    height: 400,
    backgroundColor: "black",
    borderRadius: 0,
  },
  cardTitle: {
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
  cardDescription: {
    paddingBottom: 10,
  },
  cardButtonsContainer: {
    height: 50,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default PostHomeCard;
