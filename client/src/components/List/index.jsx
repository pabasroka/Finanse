import styles from "./styles.module.css";
import stc from 'string-to-color';


const List = ({data}) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className={styles.fancy_list}>
      <h2>Reports List</h2>
      <ul>
        {data.map(transaction => (
          <li key={transaction._id} className={transaction.type === 'income' ? 'income' : 'outcome'}>
            <span>{formatDate(transaction.date)}</span>
            <span style={{ color: stc(transaction.category)}}>{transaction.category}</span>
            <span>{transaction.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
