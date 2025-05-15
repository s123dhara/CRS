import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, ArrowRight, FileText, Upload, User, Briefcase, GraduationCap, LucideFileCheck } from 'lucide-react';
import BACKEND_API from '../../services/userApi';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';


export default function ApplicantProfileForm() {
  // Form state management
  const { accessToken, loggedUser } = useAuth();
  const navigate = useNavigate();
  if(loggedUser?.isProfileComplete)  {    
    navigate('/dashboard');
  }


  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    contact_email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    headline: '',
    summary: '',
    is_public: false,

    // Education
    education: [{
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      grade: '',
      activities: '',
      description: '',
      is_current: false
    }],

    // Experience
    experience: [{
      company: '',
      title: '',
      location: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: ''
    }],

    // Skills
    skills: [{
      name: '',
      proficiency_level: 'Beginner'
    }],

    // Documents
    documents: []
  });

  // Form validation state  
  const [errors, setErrors] = useState({});

  // Handle input changes for personal information
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle education form changes
  const handleEducationChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newEducation = [...formData.education];
    newEducation[index][name] = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      education: newEducation
    });
  };

  // Add new education entry
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          institution: '',
          degree: '',
          field_of_study: '',
          start_date: '',
          end_date: '',
          grade: '',
          activities: '',
          description: '',
          is_current: false
        }
      ]
    });
  };

  // Remove education entry
  const removeEducation = (index) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({
      ...formData,
      education: newEducation
    });
  };

  // Handle experience form changes
  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newExperience = [...formData.experience];
    newExperience[index][name] = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      experience: newExperience
    });
  };

  // Add new experience entry
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: '',
          title: '',
          location: '',
          start_date: '',
          end_date: '',
          is_current: false,
          description: ''
        }
      ]
    });
  };

  // Remove experience entry
  const removeExperience = (index) => {
    const newExperience = [...formData.experience];
    newExperience.splice(index, 1);
    setFormData({
      ...formData,
      experience: newExperience
    });
  };

  // Handle skills form changes
  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const newSkills = [...formData.skills];
    newSkills[index][name] = value;
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  // Add new skill entry
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        {
          name: '',
          proficiency_level: 'Beginner'
        }
      ]
    });
  };

  // Remove skill entry
  const removeSkill = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  // Handle document upload
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);

    const newDocuments = files.map(file => ({
      title: file.name,
      file: file,
      document_type: 'resume', // Default document type
      file_size: file.size,
      file_type: file.type
    }));

    setFormData({
      ...formData,
      documents: [...formData.documents, ...newDocuments]
    });
  };

  // Remove document
  const removeDocument = (index) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);
    setFormData({
      ...formData,
      documents: newDocuments
    });
  };

  // Validate form data for current step
  const validateStep = () => {
    let isValid = true;

    if (currentStep === 1) {
      const newErrors = {};
      if (!formData.first_name) newErrors.first_name = 'First name is required';
      if (!formData.last_name) newErrors.last_name = 'Last name is required';
      if (!formData.contact_email) newErrors.contact_email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.contact_email)) newErrors.contact_email = 'Please enter a valid email address';
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number format';
      } else if (formData.phone.length >= 11) {
        newErrors.phone = 'Invalid phone number';
      }


      setErrors(newErrors);
      isValid = Object.keys(newErrors).length === 0;
    }
    else if (currentStep === 2) {
      // Validate education
      const newEducationErrors = formData.education.map(edu => {
        const eduErrors = {};
        if (!edu.institution) eduErrors.institution = 'Institution name is required';
        if (!edu.degree) eduErrors.degree = 'Degree is required';

        // Validate dates
        if (edu.start_date && edu.end_date && !edu.is_current) {
          const startDate = new Date(edu.start_date);
          const endDate = new Date(edu.end_date);
          if (endDate < startDate) {
            eduErrors.end_date = 'End date cannot be before start date';
          }
        }

        return eduErrors;
      });

      // Check if any education entry has errors
      const hasErrors = newEducationErrors.some(eduError => Object.keys(eduError).length > 0);
      setErrors({ education: newEducationErrors });
      isValid = !hasErrors;
    }

    return isValid;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    const FORMDATA = new FormData();

    // Add files from documents array
    formData.documents.forEach((doc, index) => {
      FORMDATA.append(`documents[${index}].title`, doc.title);
      FORMDATA.append(`documents[${index}].document_type`, doc.document_type);
      FORMDATA.append(`documents[${index}].file_size`, doc.file_size);
      FORMDATA.append(`documents[${index}].file_type`, doc.file_type);
      FORMDATA.append(`documents[${index}].file`, doc.file); // must be File object
    });

    // Add any other text fields from formData
    FORMDATA.append('formData', JSON.stringify(formData));
    FORMDATA.append('userEmail', loggedUser?.email);


    const result = await BACKEND_API.userApplicationForm(FORMDATA, accessToken);
    if (result.status) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    alert('Form submitted successfully!');
  };


  // Progress indicator
  const ProgressIndicator = () => {
    const steps = [
      { step: 1, title: 'Personal Info', icon: <User size={20} /> },
      { step: 2, title: 'Education', icon: <GraduationCap size={20} /> },
      { step: 3, title: 'Experience', icon: <Briefcase size={20} /> },
      { step: 4, title: 'Skills', icon: <Check size={20} /> },
      { step: 5, title: 'Documents', icon: <FileText size={20} /> }
    ];

    return (
      <div className="w-full py-4">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.step}
              className={`flex flex-col items-center ${currentStep >= step.step ? 'text-white' : 'text-violet-300'}`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 
                ${currentStep > step.step ? 'bg-green-500' : currentStep === step.step ? 'bg-white text-violet-600' : 'bg-violet-800'}`}
              >
                {currentStep > step.step ? <Check size={20} /> : step.icon}
              </div>
              <span className="text-xs font-medium">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 h-1 bg-violet-800 w-full rounded"></div>
          <div
            className="absolute top-0 h-1 bg-white rounded transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 25}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Form step components
  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">First Name*</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className={`w-full p-2 bg-violet-700 text-white rounded border ${errors.first_name ? 'border-red-500' : 'border-violet-500'}`}
            placeholder="Enter your first name"
          />
          {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Last Name*</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className={`w-full p-2 bg-violet-700 text-white rounded border ${errors.last_name ? 'border-red-500' : 'border-violet-500'}`}
            placeholder="Enter your last name"
          />
          {errors.last_name && <p className="text-red-400 text-xs mt-1">{errors.last_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Email Address*</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleInputChange}
            className={`w-full p-2 bg-violet-700 text-white rounded border ${errors.contact_email ? 'border-red-500' : 'border-violet-500'}`}
            placeholder="Enter your email"
          />
          {errors.contact_email && <p className="text-red-400 text-xs mt-1">{errors.contact_email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full p-2 bg-violet-700 text-white rounded border ${errors.phone ? 'border-red-500' : 'border-violet-500'}`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
          placeholder="Enter your address"
          rows="2"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
            placeholder="Enter your city"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">State/Province</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
            placeholder="Enter your state/province"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
            placeholder="Enter your country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Postal Code</label>
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleInputChange}
            className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
            placeholder="Enter your postal code"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Headline</label>
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleInputChange}
          className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
          placeholder="e.g., Senior Web Developer with 5+ years of experience"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Professional Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleInputChange}
          className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
          placeholder="Briefly describe your professional background and career goals"
          rows="4"
        ></textarea>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_public"
          name="is_public"
          checked={formData.is_public}
          onChange={handleInputChange}
          className="h-4 w-4 bg-violet-700 border-violet-500 focus:ring-violet-400"
        />
        <label htmlFor="is_public" className="ml-2 text-sm text-white">
          Make my profile public
        </label>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Education Background</h2>

      {formData.education.map((edu, index) => (
        <div key={index} className={`p-4 ${errors.education && Object.keys(errors.education[index] || {}).length > 0 ? 'bg-violet-700 border border-red-400' : 'bg-violet-700'} rounded-lg space-y-4`}>
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-white">Education #{index + 1}</h3>
            {formData.education.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Institution*</label>
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, e)}
                className={`w-full p-2 bg-violet-800 text-white rounded border ${errors.education && errors.education[index]?.institution ? 'border-red-500' : 'border-violet-500'}`}
                placeholder="Enter institution name"
              />
              {errors.education && errors.education[index]?.institution && (
                <p className="text-red-400 text-xs mt-1">{errors.education[index].institution}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Degree*</label>
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
                className={`w-full p-2 bg-violet-800 text-white rounded border ${errors.education && errors.education[index]?.degree ? 'border-red-500' : 'border-violet-500'}`}
                placeholder="e.g., Bachelor of Science"
              />
              {errors.education && errors.education[index]?.degree && (
                <p className="text-red-400 text-xs mt-1">{errors.education[index].degree}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Field of Study</label>
              <input
                type="text"
                name="field_of_study"
                value={edu.field_of_study}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
                placeholder="e.g., Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Grade/GPA</label>
              <input
                type="text"
                name="grade"
                value={edu.grade}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
                placeholder="e.g., 3.8/4.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={edu.start_date}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">End Date</label>
              <input
                type="date"
                name="end_date"
                value={edu.end_date}
                disabled={edu.is_current}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
              />

              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`is_current_edu_${index}`}
                  name="is_current"
                  checked={edu.is_current}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="h-4 w-4 bg-violet-800 border-violet-500 focus:ring-violet-400"
                />
                <label htmlFor={`is_current_edu_${index}`} className="ml-2 text-sm text-white">
                  I am currently studying here
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Activities</label>
            <textarea
              name="activities"
              value={edu.activities}
              onChange={(e) => handleEducationChange(index, e)}
              className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
              placeholder="List any extracurricular activities, clubs, etc."
              rows="2"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Description</label>
            <textarea
              name="description"
              value={edu.description}
              onChange={(e) => handleEducationChange(index, e)}
              className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
              placeholder="Describe your education experience"
              rows="3"
            ></textarea>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="flex items-center justify-center w-full p-2 bg-violet-700 hover:bg-violet-800 text-white rounded border border-dashed border-violet-400 transition"
      >
        <span className="mr-2">+</span> Add Another Education
      </button>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Work Experience</h2>

      {formData.experience.map((exp, index) => (
        <div key={index} className="p-4 bg-violet-700 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-white">Experience #{index + 1}</h3>
            {formData.experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Company/Organization*</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Job Title*</label>
              <input
                type="text"
                name="title"
                value={exp.title}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
                placeholder="e.g., Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={exp.location}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
                placeholder="e.g., San Francisco, CA"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-white mb-1">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={exp.start_date}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-white mb-1">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={exp.end_date}
                  disabled={exp.is_current}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={`is_current_exp_${index}`}
              name="is_current"
              checked={exp.is_current}
              onChange={(e) => handleExperienceChange(index, e)}
              className="h-4 w-4 bg-violet-800 border-violet-500 focus:ring-violet-400"
            />
            <label htmlFor={`is_current_exp_${index}`} className="ml-2 text-sm text-white">
              I currently work here
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Description</label>
            <textarea
              name="description"
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, e)}
              className="w-full p-2 bg-violet-800 text-white rounded border border-violet-500"
              placeholder="Describe your responsibilities and achievements"
              rows="4"
            ></textarea>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="flex items-center justify-center w-full p-2 bg-violet-700 hover:bg-violet-800 text-white rounded border border-dashed border-violet-400 transition"
      >
        <span className="mr-2">+</span> Add Another Experience
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Skills</h2>
      <p className="text-violet-200">Add skills that showcase your expertise.</p>

      {formData.skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              name="name"
              value={skill.name}
              onChange={(e) => handleSkillChange(index, e)}
              className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
              placeholder="e.g., JavaScript, Project Management, etc."
            />
          </div>

          <div className="w-40">
            <select
              name="proficiency_level"
              value={skill.proficiency_level}
              onChange={(e) => handleSkillChange(index, e)}
              className="w-full p-2 bg-violet-700 text-white rounded border border-violet-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {formData.skills.length > 1 && (
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="p-2 text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        className="flex items-center justify-center w-full p-2 bg-violet-700 hover:bg-violet-800 text-white rounded border border-dashed border-violet-400 transition"
      >
        <span className="mr-2">+</span> Add Another Skill
      </button>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Upload Documents</h2>
      <p className="text-violet-200">Upload your resume, certificates, or other relevant documents.</p>

      <div className="border-2 border-dashed border-violet-400 rounded-lg p-6 text-center">
        <Upload className="mx-auto h-12 w-12 text-violet-300" />
        <h3 className="mt-2 text-sm font-medium text-white">Drop files here or click to upload</h3>
        <p className="mt-1 text-xs text-violet-300">
          Support for PDF, DOCX, JPEG, PNG (Max 5MB each)
        </p>
        <input
          type="file"
          onChange={handleDocumentUpload}
          multiple
          // className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          className="inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="relative mt-4">
          <input
            type="file"
            onChange={handleDocumentUpload}
            multiple
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 bg-violet-700 border border-transparent rounded-md font-medium text-white hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Select Files
          </label>
        </div>
      </div>

      {formData.documents.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-white">Uploaded Files</h3>
          <ul className="space-y-2">
            {formData.documents.map((doc, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-violet-700 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-violet-300 mr-2" />
                  <div>
                    <span className="text-white">{doc.title}</span>
                    <p className="text-xs text-violet-300">
                      {(doc.file_size / 1024).toFixed(2)} KB • {doc.document_type || 'Document'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // Render current step based on state
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderEducation();
      case 3:
        return renderExperience();
      case 4:
        return renderSkills();
      case 5:
        return renderDocuments();
      default:
        return null;
    }
  };

  // Navigation buttons
  const renderNavigation = () => (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={handlePrevious}
          className="flex items-center px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white rounded transition"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </button>
      )}

      {currentStep < 5 ? (
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded ml-auto transition"
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      ) : (
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded ml-auto transition"
        >
          <LucideFileCheck className="mr-2 h-4 w-4" />
          Submit Application
        </button>
      )}
    </div>
  );

  return (
    <>
      {loggedUser?.isProfileComplete ? (
        <>
          {/* You can put whatever should show when profile is complete here */}
          <div className="text-black p-6">Your profile is already complete.</div>
        </>
      ) : (
        <div className="min-h-screen bg-violet-600 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Applicant Profile</h1>
              <p className="mt-2 text-violet-200">
                Complete all sections to create your applicant profile
              </p>
            </div>

            <div className="bg-violet-800 shadow-lg rounded-lg p-6 mb-6">
              <ProgressIndicator />
            </div>

            <div className="bg-violet-800 shadow-lg rounded-lg p-6">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {renderCurrentStep()}
              </form>
              {renderNavigation()}
            </div>
          </div>
        </div>
      )}
    </>
  );

}