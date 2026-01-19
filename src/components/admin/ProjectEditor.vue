<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["delete"]);

// Helper for previewing images safely
const getImageUrl = (filename) => {
    if (!filename) return "";
    try {
        return new URL(`/src/img/${filename}`, import.meta.url).href;
    } catch (e) {
        return "";
    }
};

// --- Array Management: img_md ---
const newImgMd = ref("");
const addImgMd = () => {
    if (!newImgMd.value) return;
    if (!props.project.img_md) props.project.img_md = [];
    props.project.img_md.push(newImgMd.value);
    newImgMd.value = "";
};
const removeImgMd = (index) => {
    props.project.img_md.splice(index, 1);
};
// Simple drag-drop reordering could be added here, currently just list

// --- Array Management: roles ---
const newRole = ref("");
const addRole = () => {
    if (!newRole.value) return;
    if (!props.project.roles) props.project.roles = [];
    props.project.roles.push(newRole.value);
    newRole.value = "";
};
const removeRole = (index) => {
    props.project.roles.splice(index, 1);
};

// --- Object Management: credit ---
// Transfrom object to array of {key, value} for editing
const creditList = ref([]);
const creditKey = ref("");
const creditValue = ref("");

const syncCreditList = () => {
    if (!props.project.credit) {
        creditList.value = [];
        return;
    }
    creditList.value = Object.entries(props.project.credit).map(([k, v]) => ({ key: k, value: v }));
};

// Watch for project change to resync
watch(
    () => props.project,
    () => {
        syncCreditList();
        // same for img_md if valid?
    },
    { immediate: true }
);

const addCredit = () => {
    if (!creditKey.value || !creditValue.value) return;
    // Update local list
    creditList.value.push({ key: creditKey.value, value: creditValue.value });
    // Update real object
    if (!props.project.credit) props.project.credit = {};
    props.project.credit[creditKey.value] = creditValue.value;

    creditKey.value = "";
    creditValue.value = "";
};

const removeCredit = (index) => {
    const item = creditList.value[index];
    creditList.value.splice(index, 1);
    delete props.project.credit[item.key];
};

</script>

<template>
    <div class="h-full flex flex-col bg-gray-50">
        <!-- Toolbar -->
        <div class="bg-white border-b px-6 py-3 flex justify-between items-center sticky top-0 z-10 shadow-sm">
            <div>
                <h2 class="text-lg font-bold text-gray-800">{{ project.name || "Untitled Project" }}</h2>
                <div class="text-xs text-gray-400 font-mono">{{ project.url_name }}</div>
            </div>
            <div>
                 <button
                    @click="$emit('delete', project)"
                    class="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded transition text-sm font-medium flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Project
                </button>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-6 lg:p-10">
            <div class="max-w-5xl mx-auto space-y-8">

                <!-- Main Visuals -->
                <section class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 border-b pb-2">Visuals</h3>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="w-full md:w-1/3 space-y-2">
                             <label class="block text-xs font-medium text-gray-700">Main Image Filename</label>
                             <input v-model="project.img" class="w-full border rounded px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 01_img.webp" />
                             <!-- Preview -->
                             <div class="mt-2 aspect-video bg-gray-100 rounded overflow-hidden border flex items-center justify-center">
                                 <img v-if="project.img" :src="getImageUrl(project.img)" class="w-full h-full object-cover" />
                                 <span v-else class="text-xs text-gray-400">Preview</span>
                             </div>
                        </div>
                        <div class="w-full md:w-2/3 space-y-2">
                            <label class="block text-xs font-medium text-gray-700">Project Images (img_md)</label>
                            <div class="space-y-2">
                                <div v-for="(img, idx) in project.img_md" :key="idx" class="flex gap-2">
                                    <input v-model="project.img_md[idx]" class="flex-1 border rounded px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none" />
                                    <button @click="removeImgMd(idx)" class="text-gray-400 hover:text-red-500 px-2 transition">×</button>
                                </div>
                                <div class="flex gap-2">
                                    <input
                                        v-model="newImgMd"
                                        @keydown.enter.prevent="addImgMd"
                                        placeholder="Add new image filename..."
                                        class="flex-1 border border-dashed rounded px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                                    />
                                    <button @click="addImgMd" class="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 rounded text-sm font-bold">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Basic Info -->
                 <section class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 border-b pb-2">Basic Info</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-1">
                            <label class="block text-xs font-medium text-gray-700">Name (ZH)</label>
                            <input v-model="project.name" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                         <div class="space-y-1">
                            <label class="block text-xs font-medium text-gray-700">Name (EN)</label>
                            <input v-model="project.en_name" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div class="space-y-1">
                            <label class="block text-xs font-medium text-gray-700">URL Slug</label>
                            <input v-model="project.url_name" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" />
                        </div>
                        <div class="space-y-1">
                            <label class="block text-xs font-medium text-gray-700">Date</label>
                            <input v-model="project.date" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div class="space-y-1">
                            <label class="block text-xs font-medium text-gray-700">Company</label>
                            <input v-model="project.company" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div class="space-y-1">
                            <label class="block text-xs font-medium text-gray-700">Behance URL</label>
                            <input v-model="project.behance" class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-blue-600" />
                        </div>
                    </div>
                </section>

                <!-- Description & Roles -->
                <section class="grid md:grid-cols-2 gap-8">
                     <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex flex-col">
                        <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 border-b pb-2">Description</h3>
                         <textarea
                            :value="project.msg?.join('\n\n')"
                            @input="project.msg = $event.target.value.split('\n\n')"
                            class="w-full flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px] text-sm leading-relaxed"
                            placeholder="Separate paragraphs with double enter..."
                        ></textarea>
                     </div>

                     <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 border-b pb-2">Roles / Tags</h3>
                        <div class="flex flex-wrap gap-2 mb-3">
                            <span v-for="(role, idx) in project.roles" :key="idx" class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 group">
                                {{ role }}
                                <button @click="removeRole(idx)" class="text-blue-400 group-hover:text-blue-900">×</button>
                            </span>
                        </div>
                         <div class="flex gap-2">
                            <input
                                v-model="newRole"
                                @keydown.enter.prevent="addRole"
                                placeholder="Add skill/role..."
                                class="flex-1 border border-dashed rounded px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                            />
                            <button @click="addRole" class="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 rounded text-xs font-bold">+</button>
                        </div>
                     </div>
                </section>

                <!-- Credits (Key-Value) -->
                <section class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                     <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 border-b pb-2">Credits</h3>
                     <div class="space-y-2">
                        <div v-for="(item, idx) in creditList" :key="idx" class="flex gap-2 items-center text-sm border-b border-gray-100 pb-2 last:border-0 hover:bg-gray-50">
                            <div class="w-1/3 font-bold text-gray-600 truncate" title="Key">{{ item.key }}</div>
                            <div class="w-2/3 text-gray-800 truncate" title="Value">{{ item.value }}</div>
                             <button @click="removeCredit(idx)" class="text-gray-300 hover:text-red-500 px-2 transition">×</button>
                        </div>

                        <!-- Add New -->
                         <div class="flex gap-2 mt-4 pt-4 border-t border-dashed">
                             <input v-model="creditKey" placeholder="Role (e.g. Director)" class="w-1/3 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                             <input v-model="creditValue" placeholder="Name" class="w-2/3 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                             <button @click="addCredit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded text-sm font-bold">Add</button>
                         </div>
                     </div>
                </section>

                <!-- Raw Check -->
                 <details class="text-xs text-gray-400">
                     <summary class="cursor-pointer hover:text-gray-600">Debug Raw Data</summary>
                     <pre class="bg-gray-100 p-4 rounded mt-2 overflow-auto max-h-40">{{ project }}</pre>
                 </details>

            </div>
        </div>
    </div>
</template>
