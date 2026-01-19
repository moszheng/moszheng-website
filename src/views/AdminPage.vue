<script setup>
import { ref, onMounted } from "vue";
import WorksData from "@/data/WorksData.json";
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import ProjectEditor from "@/components/admin/ProjectEditor.vue";

const isDev = import.meta.env.DEV;

// State
const projects = ref([]);
const selectedProject = ref(null);
const statusMessage = ref("");
const isSaving = ref(false);

// Initialize
onMounted(() => {
    // Deep copy to detach from the imported module (though HMR will still trigger reload on file save)
    projects.value = JSON.parse(JSON.stringify(WorksData.project));

    // Select first by default
    if (projects.value.length > 0) {
        selectedProject.value = projects.value[0];
    }
});

const handleSelect = (project) => {
    selectedProject.value = project;
};

const handleAdd = () => {
    const newProj = {
        name: "New Project",
        en_name: "New Project EN",
        url_name: `new_project_${Date.now()}`,
        date: new Date().getFullYear().toString(),
        img: "",
        img_md: [],
        company: "Self",
        msg: [],
        roles: [],
        credit: {},
    };
    projects.value.unshift(newProj);
    selectedProject.value = newProj;
};

const handleDelete = (project) => {
    if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
        const idx = projects.value.indexOf(project);
        if (idx !== -1) {
            projects.value.splice(idx, 1);
            selectedProject.value = projects.value[0] || null;
        }
    }
};

const saveChanges = async () => {
    if (isSaving.value) return;
    isSaving.value = true;
    statusMessage.value = "Saving to disk...";

    try {
        // Construct the full JSON structure
        const payload = {
            // Preserve other root keys if any (WorksData might have more than 'project')
            ...WorksData,
            project: projects.value
        };

        const response = await fetch("/api/save-works", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            statusMessage.value = "Success! Page may reload...";
            // HMR will likely reload the page shortly
        } else {
            statusMessage.value = "Error saving file.";
            console.error("Save failed:", await response.text());
        }
    } catch (e) {
        statusMessage.value = "Network Error";
        console.error(e);
    } finally {
        setTimeout(() => {
            isSaving.value = false;
            if (statusMessage.value === "Success! Page may reload...") {
                 // Keep it visible until reload
            } else {
                 statusMessage.value = "";
            }
        }, 2000);
    }
};
</script>

<template>
    <div class="mt-16 h-screen w-screen bg-gray-100 flex overflow-hidden font-sans text-gray-700">

        <!-- Dev Guard -->
        <div v-if="!isDev" class="m-auto text-center p-10 bg-white shadow-xl rounded-xl">
            <h1 class="text-4xl font-bold text-red-500 mb-4">Development Mode Only</h1>
            <p class="text-gray-500">Please run locally to access the CMS.</p>
            <router-link to="/" class="mt-6 inline-block text-blue-500 underline">Go Home</router-link>
        </div>

        <template v-else>
            <!-- Sidebar -->
            <div class="w-80 flex-shrink-0 flex flex-col z-20 shadow-xl">
                <div class="h-16 bg-gray-900 flex items-center px-4 justify-between flex-shrink-0">
                    <div class="font-bold text-white text-lg tracking-wide flex items-center gap-2">
                        <span class="bg-blue-600 w-2 h-6 rounded-sm"></span>
                        MOS CMS
                    </div>
                    <button @click="handleAdd" class="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded font-bold transition">
                        + NEW
                    </button>
                </div>
                <AdminSidebar
                    :projects="projects"
                    :selectedProject="selectedProject"
                    @select="handleSelect"
                />
            </div>

            <!-- Main Content -->
            <div class="flex-1 flex flex-col min-w-0 bg-gray-50">
                <!-- Topbar -->
                <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <div class="flex items-center gap-4">
                        <div v-if="statusMessage" class="flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-blue-700 text-sm font-medium animate-pulse">
                            <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                            {{ statusMessage }}
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <a href="/" target="_blank" class="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1 transition">
                            View Site
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        <button
                            @click="saveChanges"
                            :disabled="isSaving"
                            class="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded shadow-lg transform active:scale-95 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <svg v-if="isSaving" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {{ isSaving ? 'SAVING...' : 'SAVE CHANGES' }}
                        </button>
                    </div>
                </header>

                <!-- Editor -->
                <main class="flex-1 overflow-hidden relative">
                    <ProjectEditor
                        v-if="selectedProject"
                        :project="selectedProject"
                        @delete="handleDelete"
                    />
                    <div v-else class="absolute inset-0 flex items-center justify-center text-gray-300 flex-col gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p class="font-medium text-lg">Select a project to edit</p>
                    </div>
                </main>
            </div>
        </template>
    </div>
</template>
