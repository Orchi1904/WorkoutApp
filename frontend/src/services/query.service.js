import { useMutation } from 'react-query';
import authHeader from './auth.header';
import { makeRequest } from '../request';

export function getRequest(path, set, navigate) {
    makeRequest.get(path, { headers: authHeader() })
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
        return makeRequest.post(path, data, { headers: authHeader() });
    },
        {
            onSuccess: () => refetch(),
        }
    );
}

export function useUpdateMutation(path, refetch) {
    return useMutation((data) => {
        return makeRequest.put(path, data, { headers: authHeader() })
    },
        {
            onSuccess: () => refetch(),
        }
    )
}

export function useDeleteMutation(path, refetch) {
    return useMutation((data) => {
        return makeRequest.delete(path + data.id, { headers: authHeader() })
    },
        {
            onSuccess: () => refetch(),
        }
    )
}