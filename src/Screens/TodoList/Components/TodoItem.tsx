import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../../../Styles';
import useDynamicColors from '../../../Styles/useColors';
import { TodoItem } from '../../../Types';

interface TodoProps {
  todoItem: TodoItem;
  toggleComplete: (todo: TodoItem) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: TodoItem) => void;
}

const Todo = ({ todoItem, toggleComplete, onDelete, onEdit }: TodoProps) => {
  const Colors = useDynamicColors();
  const textStyle = {
    color: Colors.textColor
  };

  const onTogglePress = () => {
    toggleComplete(todoItem);
  }

  const onEditPress = () => {
    onEdit(todoItem);
  }

  const onDeletePress = () => {
    onDelete(todoItem.id);
  };

  return (
    <View style={styles.todoWrapper}>
      <View style={[CommonStyles.flexOne, CommonStyles.flexRow]}>
        <TouchableOpacity onPress={onTogglePress}>
          {todoItem.isCompleted ? (
            <Icon name='check-circle-o' size={20} color='green' style={styles.checkmarkIcon} />
          ) : (
            <Icon name='circle-o' size={20} color='#FFFFFF' style={styles.checkmarkIcon} />
          )}
        </TouchableOpacity>
        <Text style={[textStyle]}>{todoItem.title}</Text>
      </View>
      <View style={CommonStyles.flexRow}>
        <TouchableOpacity style={styles.button} onPress={onEditPress}>
          <Icon name='pencil' size={20} color='#FFFFFF' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onDeletePress}>
          <Icon name='trash' size={20} color='red' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoWrapper: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 18,
    backgroundColor: '#484848',
    borderRadius: 18
  },
  checkmarkIcon: {
    paddingRight: 8
  },
  button: {
    paddingHorizontal: 8
  }
});

export default Todo;