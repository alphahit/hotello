import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RW, RH, FONTS, SIZES } from '../theme/fonts';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface Comment {
  id: string;
  user_name: string;
  comment_text: string;
}

interface TweetContentParams {
  reviewText?: string;
  commentCount?: number;
  likeCount?: number;
  shareCount?: number;
  comments?: Comment[];
}

interface TweetContentProps {
  comments: string;
  setComments: (text: string) => void;
  commentBoxopen: boolean;
  setcommentBoxopen: (open: boolean) => void;
}

export const TweetContent = ({
  comments,
  setComments,
  commentBoxopen,
  setcommentBoxopen,
}: TweetContentProps) => {
  const toggleCommentBoxAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setcommentBoxopen(!commentBoxopen);
  };
  const route = useRoute();
  const params = route.params as TweetContentParams;

  const renderComments = (item: Comment) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentUser}>{item?.user_name}</Text>
      <Text style={styles.commentText}>{item?.comment_text}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <View style={styles.reviewBox}>
        <Text style={styles.reviewText}>{params?.reviewText}</Text>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionBtn}>
          <FontAwesome name="comments" size={RW(18)} color="#000" />
          <Text style={styles.actionCount}>{params?.commentCount ?? 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <AntDesign name="like1" size={RW(18)} color="#000" />
          <Text style={styles.actionCount}>{params?.likeCount ?? 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <FontAwesome name="share-square" size={RW(18)} color="#000" />
          <Text style={styles.actionCount}>{params?.shareCount ?? 0}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.commentSection}>
        <View style={styles.commentDot} />
        <TouchableOpacity
          onPress={toggleCommentBoxAccordion}
          style={styles.addCommentRow}
          activeOpacity={1}
        >
          <Text style={styles.addCommentText}>Add a comment</Text>
        </TouchableOpacity>
        <View style={styles.commentInputWrapper}>
          {commentBoxopen ? (
            <TextInput
              style={styles.commentInput}
              numberOfLines={5}
              textAlignVertical={'top'}
              underlineColorAndroid={'transparent'}
              multiline={true}
              autoCorrect
              onChangeText={setComments}
              value={comments}
              placeholder="Write your comment..."
              placeholderTextColor="#888"
            />
          ) : (
            <TouchableOpacity
              onPress={toggleCommentBoxAccordion}
              style={styles.commentInputTouchable}
            >
              <Text style={styles.commentInputPlaceholder}>
                {comments ? comments : 'Write Comment'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {commentBoxopen && comments.length > 0 && (
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        )}
        <FlatList
          data={params?.comments || []}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderComments(item)}
          style={styles.commentsList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
    padding: RW(8),
  },
  reviewBox: {
    marginTop: RH(20),
    borderWidth: 1,
    padding: RH(10),
    borderRadius: RW(8),
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginHorizontal: RW(2),
    marginBottom: RH(10),
  },
  reviewText: {
    color: 'black',
    fontFamily: FONTS.PM,
    fontSize: SIZES.s,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: RH(10),
    width: '100%',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RW(8),
  },
  actionCount: {
    color: 'black',
    fontSize: SIZES.xs,
    fontFamily: FONTS.PM,
    marginLeft: RW(4),
  },
  commentSection: {
    borderLeftWidth: 1,
    width: '100%',
    borderStyle: 'dashed',
    borderColor: '#11ebae',
    paddingHorizontal: RW(10),
    paddingBottom: RH(10),
    flex: 1,
  },
  commentDot: {
    backgroundColor: '#11ebae',
    borderRadius: 100,
    height: RW(10),
    width: RW(10),
    position: 'absolute',
    left: -RW(5),
    top: RH(10),
  },
  addCommentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: RW(10),
    marginTop: RH(10),
    alignItems: 'center',
  },
  addCommentText: {
    color: 'black',
    fontSize: SIZES.m,
    fontWeight: '500',
    paddingLeft: RW(5),
    fontFamily: FONTS.PB,
  },
  commentInputWrapper: {
    backgroundColor: 'white',
    borderRadius: RW(5),
    borderWidth: 1,
    borderColor: '#e2e2e2',
    marginVertical: RH(10),
  },
  commentInput: {
    borderWidth: 1,
    padding: RH(8),
    borderRadius: RW(5),
    color: 'black',
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    minHeight: RH(60),
  },
  commentInputTouchable: {
    height: RH(40),
    justifyContent: 'center',
    paddingLeft: RW(10),
  },
  commentInputPlaceholder: {
    color: 'black',
    fontSize: SIZES.s,
    fontFamily: FONTS.PR,
  },
  saveBtn: {
    height: RH(30),
    width: RW(60),
    backgroundColor: '#00ce61',
    borderRadius: RW(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: RH(8),
  },
  saveBtnText: {
    color: 'black',
    textAlign: 'center',
    fontSize: SIZES.s,
    fontFamily: FONTS.PB,
  },
  commentsList: {
    height: '100%',
    width: '100%',
  },
  commentContainer: {
    marginTop: -RH(10),
    paddingBottom: RH(10),
    marginBottom: 0,
  },
  commentUser: {
    color: 'black',
    fontSize: SIZES.s,
    fontFamily: FONTS.PB,
    marginLeft: RW(10),
    marginTop: RH(10),
    transform: [{ rotate: '350deg' }],
  },
  commentText: {
    color: 'black',
    fontSize: SIZES.s,
    padding: RH(10),
    backgroundColor: '#9FFFE0',
    borderRadius: RW(10),
    width: '95%',
    marginTop: RH(5),
    alignSelf: 'center',
    fontFamily: FONTS.PR,
    transform: [{ rotate: '350deg' }],
  },
});
