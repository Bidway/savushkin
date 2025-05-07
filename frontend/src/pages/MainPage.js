import React, { useState, useEffect } from 'react';
import SiteSelector from '../../components/SiteSelector';
import ProjectsTable from '../../components/ProjectsTable';
import { useSites, useSubnets, useProjects, useRanges, useDevices, useInterfaces } from '../../hooks';
import { useSitesStore, useProjectsStore, useRangesStore, useDevicesStore, useInterfacesStore, useSubnetsStore } from '../../stores';
import '../../App.css';


const MainPage = () => {

    const { loadSites } = useSitesStore();
    const { loadProjects, expandedProjects,setExpandedProjects } = useProjectsStore();
    const { loadRanges, expandedRanges, setExpandedRanges } = useRangesStore();
    const { loadDevices } = useDevicesStore();
    const { loadInterfaces } = useInterfacesStore();

    useEffect(() => {
        loadSites();
    }, []);

    const toggleProject = (projectId) => {
        if (expandedProjects.includes(projectId)) {
            setExpandedProjects(expandedProjects.filter(id => id !== projectId));
        } else {
            setExpandedProjects([...expandedProjects, projectId]);
        }
    };
    const toggleRange = (rangeId) => {
        if (expandedRanges.includes(rangeId)) {
            setExpandedRanges(expandedRanges.filter(id => id !== rangeId));
        } else {
            setExpandedRanges([...expandedRanges, rangeId]);
        }
    };
    return (
        <div className="app">
            <SiteSelector
            />

            {(
                <ProjectsTable
                    toggleProject={toggleProject}
                    toggleRange={toggleRange}
                />
            )}
        </div>
    );
};

export default MainPage;