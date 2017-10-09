import React from 'react'

const ArtifactsList = ({items}) => <div>
    <table className="table table-hover">
        <thead>
        <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Bought on</th>
        </tr>
        </thead>
        <tbody>
        {items.map(a => <tr key={a.id}>
            <td>{a.name}</td>
            <td>{a.weight}</td>
            <td>{a.boughtOn}</td>
        </tr>)
        }
        </tbody>

    </table>
</div>;

export default ArtifactsList