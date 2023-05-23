import { Link } from "react-router-dom"

export default function ReposList({ items }) {
    // TODO: li unique keys
    return items.map((item) => <li><Link to={`/plan/${item}`}>{item}</Link></li>)
}
