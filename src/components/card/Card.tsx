import { IIssues } from '../../interfaces/issuses.interface';
import './Card.scss';

export const Card = ({ title, number, created_at, user, comments}: IIssues) => {
    return (
        <div className='card'>
            <h2 className='card__title'>{title}</h2>
            <h3 className='card__number'>{`#${number} created ${created_at}`}</h3>
            <p className='card__comments'>{`${user} | Comments: ${comments}`}</p>
        </div>
    )
}
