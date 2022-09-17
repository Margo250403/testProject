import { Dispatch } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { AppState } from "../../store";
import { getPathName, loadIssue } from "../../store/actions";
import './Header.scss';
import Button from 'react-bootstrap/Button';


export const Header = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const pathName = useSelector((state: AppState) => state.main.pathName);

    return (
        <div>
            <input
                className="input-url"
                type="text"
                placeholder='Enter repo URL'
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(getPathName(new URL(e.target.value).pathname))}
            />
            <Button variant="secondary" size="lg" active onClick={() => dispatch(loadIssue(pathName))}> Load issues</Button>
        </div>
    )
}


