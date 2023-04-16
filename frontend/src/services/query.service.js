import { useMutation } from 'react-query';
import authHeader from './auth.header';
import { makeRequest } from '../request';

export function getRequest(path, param = "") {
    return makeRequest.get(path + param, { headers: authHeader() }).then((res) => {
        return res.data;
    },
        (error) => {
            console.log(error);
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