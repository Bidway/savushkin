import { api } from './apiConfig';

//
export const fetchSites = async () => {
    try {
        const response = await api.get('/api/sites');
        return response.data;
    } catch (error) {
        console.error('Error fetching sites:', error);
        throw error;
    }
};
//
export const fetchProjects = async (siteId) => {
    try {
        // 1. Получаем проекты сайта
        const projectsResponse = await api.get(`/api/projects/site/${siteId}`);

        // 2. Для каждого проекта параллельно получаем устройства и диапазоны
        const projectsWithData = await Promise.all(
            projectsResponse.data.map(async project => {
                const [rangesResponse, devicesResponse] = await Promise.all([
                    api.get(`/api/ranges/project/${project.id}`),
                    api.get(`/api/devices/project/${project.id}`)
                ]);

                // 3. Для каждого устройства получаем интерфейсы
                const devicesWithInterfaces = await Promise.all(
                    devicesResponse.data.map(async device => {
                        const interfacesResponse = await api.get(`/api/interfaces/device/${device.id}`);
                        return {
                            ...device,
                            interfaces: interfacesResponse.data
                        };
                    })
                );
                const rangesWithInterfaces = await Promise.all(
                    rangesResponse.data.map(async range => {
                        const interfacesResponse = await api.get(`/api/interfaces/range/${range.id}`);
                        return {
                            ...range,
                            interfaces: interfacesResponse.data
                        };
                    })
                );


                return {
                    ...project,
                    ranges: rangesWithInterfaces,
                    devices: devicesWithInterfaces
                };
            })

        );

        return projectsWithData;
    } catch (error) {
        console.error('Error fetching projects with devices:', error);
        throw error;
    }
};

export const fetchSubnets = async (siteId) => {
    try {
        // 1. Получаем подсети сайта
        const subnetsResponse = await api.get(`/api/subnets/site/${siteId}`);

        // 2. Для каждой подсети получаем диапазоны
        const subnetsWithRanges = await Promise.all(
            subnetsResponse.data.map(async subnet => {
                const rangesResponse = await api.get(`/api/ranges/subnet/${subnet.id}`);
                return {
                    ...subnet,
                    ranges: rangesResponse.data
                };
            })
        );

        return subnetsWithRanges;
    } catch (error) {
        console.error('Error fetching subnets with ranges:', error);
        throw error;
    }
};

//РАБОТАЕТ
export const updateEntity = async (entityType, id, data) => {
    try {
        await api.put(`/api/${entityType}/${id}`, data);
    } catch (error) {
        console.error(`Error updating ${entityType}:`, error);
        throw error;
    }
};
