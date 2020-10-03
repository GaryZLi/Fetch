import React, { useEffect, useState } from 'react';
import './App.css';

const styles = {
	container: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		overflow: 'auto',
	},
	column: {
		marginLeft: 5,
		marginRight: 5,
	},
	listId: {
		height: 50,
		width: 110,
		border: '1px solid black',
	},
	item: {
		height: 50,
		width: 110,
		border: '1px solid black',
	},
	group: {
		display: 'flex',
	},
	center: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
};

function App() {
	const [items, setItems] = useState();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`)
			.then(res => res.json())
			.then(res => {
				const map = {};

				res
					.filter(item => item.name?.length)
					.forEach(item => 
						map[item.listId]
						? map[item.listId].push({
							id: item.id,
							name: item.name,
						})
						: map[item.listId] = [{
							id: item.id,
							name: item.name,
						}]
					)

				setItems(map)
			})
			.catch(err => console.log(err));
	}, []);


	const getColumns = () => {
		const columns = [];

		for (const id in items) {
			columns.push({
				id,
				items: items[id].sort((a,b) => a.id - b.id),
			})	
		}

		return columns;
	};

	const getTable = () => (
		getColumns()
			.sort((a, b) => a.id - b.id)
			.map((col, id) => {
				return (
					<div
						key={id}
						style={styles.column}
					>
						<div style={{
							...styles.center,
							...styles.listId,
						}}>
							{col.id}
						</div>
						{
							col.items.map((item, id) => (
								<div key={id} style={styles.group}>
									<div style={{
											...styles.item,
											...styles.center,
										}}
									>
										{item.name}
									</div>
								</div>
							))
						}
					</div>
				)
			})
	);

	return (
		<div style={styles.container}>
			{getTable()}
		</div>
	);
}

export default App;
