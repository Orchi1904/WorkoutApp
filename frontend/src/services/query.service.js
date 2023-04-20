import { useMutation } from 'react-query';
import { makeRequest } from '../request';

export function getRequest(path, set, navigate) {
    makeRequest.get(path)
        .then(response => {
            set(response.data);
        })
        .catch(error => {
            if (error.response.status === 403) {
                navigate("/404");
            }
            console.error(error);
        });
}

export function usePostMutation(path, refetch) {
    return useMutation((data) => {
        return makeRequest.post(path, data);
    },
        {
            onSuccess: () => refetch("erfolgreich angelegt!"),
        }
    );
}

export function useUpdateMutation(path, refetch) {
    return useMutation((data) => {
        return makeRequest.put(path, data)
    },
        {
            onSuccess: () => refetch("erfolgreich aktualisiert!"),
        }
    )
}

export function useDeleteMutation(path, refetch) {
    return useMutation((data) => {
        return makeRequest.delete(path + data.id)
    },
        {
            onSuccess: () => refetch("erfolgreich gelöscht!"),
        }
    )
}