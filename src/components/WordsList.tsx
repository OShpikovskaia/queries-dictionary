import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getWords } from '../api';
import { Word } from '../store/Types';

const Container = styled.section`
    margin: 2rem auto;
    max-width: 600px;
    padding: 1rem;
    border: 1px solid #d4cdc0;
    border-radius: 4px;
    background-color: #fff;
    -webkit-box-shadow: 1px 3px 12px 1px rgba(0,0,0,0.12); 
    box-shadow: 1px 3px 12px 1px rgba(0,0,0,0.12);
`;

const Title = styled.h2`
    margin: 0 0 1rem;
    text-align: center;
    color: #535c53;
`;

const Status = styled.p`
    margin: 0;
    text-align: center;
    color: #535c53;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    padding: 0.5rem;
    border-bottom: 1px solid #f0ebe2;
    color: #535c53;

    &:last-of-type {
        border-bottom: none;
    }
`;

const WordsList: React.FC = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        getWords()
            .then((data) => {
                if (!isMounted) {
                    return;
                }
                setWords(data);
                setError(null);
            })
            .catch(() => {
                if (!isMounted) {
                    return;
                }
                setError('Failed to load word list. Please try again later.');
            })
            .finally(() => {
                if (!isMounted) {
                    return;
                }
                setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Container>
            <Title>List of words from db.json</Title>
            {isLoading && <Status>Loading...</Status>}
            {error && !isLoading && <Status>{error}</Status>}
            {!isLoading && !error && (
                words.length ? (
                    <List>
                        {words.map(({ id, word }) => (
                            <ListItem key={id}>{word}</ListItem>
                        ))}
                    </List>
                ) : (
                    <Status>List is empty</Status>
                )
            )}
        </Container>
    );
};

export default WordsList;
