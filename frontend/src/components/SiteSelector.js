import React, {useEffect} from 'react';
import {useProjects, useSites, useSubnets} from "../hooks";
import { useSitesStore, useProjectsStore, useSubnetsStore } from '../stores';

const SiteSelector = ({

                      }) => {
    const {
        sites,
        newSiteName,
        selectedSite,
        setNewSiteName,
        setSelectedSite,
        handleCreateSite,
    } = useSitesStore();
    const {
        newSubnet,
        setNewSubnet,
        handleCreateSubnet
    } = useSubnetsStore();
    const {
        newProject,
        setNewProject,
        handleCreateProject,
        loadProjects
    } = useProjectsStore();

    useEffect(() => {
        if (selectedSite) {
            loadProjects();
        }
    }, [selectedSite]);

    return (
        <div className="site-selector">
            <h2>Select Site</h2>
            <select
                value={selectedSite || ''}
                onChange={(e) => setSelectedSite(e.target.value)}
            >
                <option value="">Select a site</option>
                {sites.map(site => (
                    <option key={site.id} value={site.id}>{site.name}</option>
                ))}

            </select>

            <div className="create-site">
                <h3>Create New Site</h3>
                <input
                    type="text"
                    value={newSiteName}
                    onChange={(e) => setNewSiteName(e.target.value)}
                    placeholder="Site name"
                />
                <button onClick={handleCreateSite}>Create Site</button>
            </div>

            {selectedSite && (
                <div className="create-subnet">
                    <h3>Create Subnet for Selected Site</h3>
                    <input
                        type="text"
                        value={newSubnet.ip}
                        onChange={(e) => setNewSubnet({...newSubnet, ip: e.target.value, siteId: selectedSite})}
                        placeholder="IP"
                    />
                    <input
                        type="text"
                        value={newSubnet.mask}
                        onChange={(e) => setNewSubnet({...newSubnet, mask: e.target.value})}
                        placeholder="Mask"
                    />
                    <button onClick={handleCreateSubnet}>Create Subnet</button>
                </div>


            ) && (
                <div className="create-project">
                    <h3>Create Project for Selected Site</h3>
                    <input
                        type="text"
                        value={newProject.name}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value, siteId: selectedSite})}
                        placeholder="Name"
                    />
                    <button onClick={handleCreateProject}>Create Project</button>
                </div>
            )
            }
        </div>
    );
};

export default SiteSelector;