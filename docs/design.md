# Keyholders Agency - UI/UX Design & User Flows

## 1. Design Philosophy

The Keyholders Agency Dashboard builds upon the Next.js 15 Starter Kit's existing design system while introducing our automation management and credit system components. Our design philosophy emphasizes clarity, simplicity, and intuitive interaction within the established framework of the starter kit.

### 1.1 Design Principles

- **Consistency with Starter Kit**: Maintain visual and interaction consistency with the existing design system
- **Clarity**: Create clear visual hierarchies that guide users through automation management
- **Simplicity**: Reduce complexity through progressive disclosure of detailed information
- **Efficiency**: Minimize clicks and cognitive load for common tasks
- **Feedback**: Provide clear system status indicators and confirmation for all actions

### 1.2 Visual Identity

We'll leverage the starter kit's existing visual identity while ensuring our additions maintain consistency:

- **Color System**: Use the starter kit's existing color palette, including dark/light mode support
- **Typography**: Maintain the Geist Sans typography system from the starter kit
- **Component Styling**: Utilize shadcn/ui components with consistent styling
- **Spacing**: Follow the established spacing system for layout consistency
- **Animation**: Adhere to the subtle animation patterns for transitions and feedback

## 2. Key User Flows

### 2.1 Authentication Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Landing Page  │────►│  Sign Up/In     │────►│  Dashboard      │
│                 │     │  (Clerk UI)     │     │  (0 Credits)    │
└─────────────────┘     └─────────────────┘     └───────┬─────────┘
                                                        │
                                                        ▼
                                              ┌─────────────────┐
                                              │                 │
                                              │  Credit Purchase│
                                              │  Prompt         │
                                              └─────────────────┘
```

This flow differs from the starter kit by:
- Removing the forced redirect to pricing page
- Allowing immediate dashboard access after authentication
- Showing a 0 credit balance initially
- Prompting but not requiring credit purchase

### 2.2 Automation Management Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│ Dashboard       │────►│ Automations List│────►│ View Automation │
│                 │     │                 │     │ Details         │
└─────────────────┘     └─────────────────┘     └───────┬─────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│ Credit Check    │◄────┤ Toggle          │◄────┤ View Execution  │
│ If Needed       │     │ Automation      │     │ History         │
└───────┬─────────┘     └─────────────────┘     └─────────────────┘
        │
        ▼
┌─────────────────┐
│                 │
│ Credit Purchase │
│ If Insufficient │
└─────────────────┘
```

This flow covers the complete automation management experience, including the credit check before activation.

### 2.3 Credit Purchase Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│ Dashboard       │────►│ Credits Page    │────►│ Select Package  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └───────┬─────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│ Return to       │◄────┤ Confirmation    │◄────┤ Polar.sh        │
│ Dashboard       │     │ Page            │     │ Payment Process │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

This flow adapts the existing Polar.sh integration from subscriptions to credit packages.

### 2.4 Execution Monitoring Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│ Automation List │────►│ Automation      │────►│ Execution       │
│                 │     │ Details         │     │ History         │
└─────────────────┘     └─────────────────┘     └───────┬─────────┘
                                                        │
                                                        ▼
                                              ┌─────────────────┐
                                              │                 │
                                              │ Execution       │
                                              │ Details         │
                                              └─────────────────┘
```

This flow allows users to monitor the performance and history of their automations.

## 3. Interface Design

### 3.1 Dashboard Overview

The dashboard provides an at-a-glance view of the user's automation status and credit balance.

**Key Elements:**
- **Credit Balance Card**: Prominently displays current credit balance with warning when low
- **Automation Status Summary**: Shows count of active/inactive automations
- **Recent Executions Panel**: Displays latest automation runs with status
- **Quick Actions**: Buttons for common tasks (add automation, buy credits)
- **Usage Statistics**: Visualization of automation usage and credit consumption

**Placement:**
- Top section for key metrics and credit balance
- Center section for automation status
- Bottom section for recent activity

### 3.2 Automations Page

A comprehensive view of all available automations with status and controls.

**Key Elements:**
- **Search and Filter**: Tools to find specific automations
- **Automation Cards**: Visual representation of each automation
- **Toggle Controls**: Simple switches to activate/deactivate automations
- **Status Indicators**: Clear visual cues for current automation state
- **Credit Cost**: Display of credit cost per execution
- **Last Run**: Timestamp of most recent execution

**Automation Card Details:**
- Automation name and description
- Status indicator (active/inactive)
- Credit cost per run
- Toggle switch for activation
- Quick link to detailed view

### 3.3 Automation Details Page

In-depth view of a specific automation with execution history and performance metrics.

**Key Elements:**
- **Header Section**: Name, description, and status toggle
- **Metrics Panel**: Performance statistics (success rate, average duration)
- **Credit Information**: Cost per execution and total credits used
- **Execution Timeline**: Chronological view of past executions
- **Execution Details**: Expandable entries with detailed results

**Execution Entry Details:**
- Timestamp
- Status (success/failure)
- Duration
- Credits used
- Result summary
- Expandable details

### 3.4 Credits Page

Interface for viewing and purchasing credits.

**Key Elements:**
- **Current Balance**: Large, clear display of available credits
- **Usage Trend**: Graph showing credit consumption over time
- **Credit Packages**: Cards displaying available packages for purchase
- **Transaction History**: Record of past credit transactions
- **Low Balance Warning**: Alert when credits are running low

**Credit Package Cards:**
- Package name
- Credit amount
- Price
- Best value indicator (if applicable)
- Purchase button

### 3.5 Execution History Page

Detailed view of all execution history across automations.

**Key Elements:**
- **Filter Controls**: Filter by automation, status, date range
- **Sorting Options**: Sort by recency, duration, status
- **Execution List**: Comprehensive list of all executions
- **Status Summary**: Visual breakdown of success/failure rates
- **Credit Usage**: Total credits consumed by executions

## 4. Component Design

### 4.1 Credit Balance Component

A critical UI element that appears throughout the interface to show current credit status.

**Variants:**
- **Dashboard Large**: Prominent display with usage trend
- **Navigation Bar**: Compact version for persistent visibility
- **Pre-execution Check**: Shown before automation activation

**States:**
- **Healthy**: Good credit balance (green)
- **Warning**: Low credit balance (amber)
- **Critical**: Very low or zero credits (red)

### 4.2 Automation Card Component

The primary interface for viewing and managing individual automations.

**Elements:**
- Automation name and icon
- Description (truncated with expansion)
- Status indicator
- Toggle switch
- Credit cost per execution
- Last execution timestamp
- Quick actions menu

**States:**
- **Active**: Currently running (green)
- **Inactive**: Turned off (gray)
- **Error**: Problem with automation (red)
- **Processing**: State change in progress (blue, animated)

### 4.3 Execution History Component

Visualizes the history of automation executions.

**Variants:**
- **Timeline View**: Chronological display with status indicators
- **Table View**: Detailed information in rows and columns
- **Summary View**: Aggregated statistics and charts

**Elements:**
- Timestamp
- Duration
- Status indicator
- Credits used
- Automation reference
- Expandable details

### 4.4 Credit Package Selection Component

Interface for selecting and purchasing credit packages.

**Elements:**
- Package cards with pricing
- Credit amount visualization
- Most popular/best value indicators
- Clear purchase button
- Comparison information

**States:**
- Default view
- Selected state
- Purchase in progress
- Confirmation/success

## 5. Responsive Design Approach

We'll maintain the starter kit's responsive approach while ensuring our additions work across device sizes.

### 5.1 Layout Strategy

- **Desktop**: Full-featured interface with multi-column layouts
- **Tablet Landscape**: Adjusted spacing with preserved functionality
- **Tablet Portrait**: Reorganized layouts with stacked elements
- **Mobile Consideration**: Though not primary, ensure critical functions work

### 5.2 Component Adaptations

- **Cards**: Adjust from grid to list layout on smaller screens
- **Tables**: Transform to card-based views on smaller screens
- **Navigation**: Adapt from sidebar to bottom bar as needed
- **Metrics**: Stack rather than place side-by-side

### 5.3 Touch Optimization

- Increase touch target sizes on tablet devices
- Ensure toggles and buttons are easily tappable
- Adapt hover interactions to touch equivalents

## 6. Interaction Design

### 6.1 Toggle Interactions

The primary interaction for activating/deactivating automations follows this pattern:

1. User clicks toggle switch for an automation
2. Switch shows intermediate loading state (animated)
3. System performs credit check in background
   - If sufficient credits, proceeds with activation
   - If insufficient credits, reverts toggle and shows credit purchase prompt
4. Upon successful activation, toggle confirms new state
5. System provides toast notification confirming activation
6. Dashboard metrics update to reflect new status

This interaction ensures users receive immediate feedback while preventing activation when credits are insufficient.

### 6.2 Credit Purchase Interactions

The credit purchase flow is designed to be frictionless:

1. User selects a credit package by clicking its card
2. Card shows selected state with visual emphasis
3. User clicks purchase button
4. System shows brief loading state
5. User is redirected to Polar.sh for payment processing
6. Upon completion, user returns with success indication
7. Credit balance updates immediately with animation
8. Toast notification confirms successful purchase

### 6.3 Execution History Interactions

The execution history interface allows for detailed exploration:

1. User views condensed timeline of executions
2. Clicking any execution expands its details panel
3. Expanded view shows comprehensive execution data
4. User can filter history through filter controls
5. Adjusting filters causes smooth transition animation
6. Critical status indicators (success/failure) use color and icons for clarity

### 6.4 Credit Balance Warning Interactions

When credit balance becomes low:

1. Credit balance component changes to warning state
2. Subtle animation draws attention to the change
3. Warning toast appears with direct link to purchase page
4. Attempting to activate new automations shows credit warning
5. Warning persists until credits are purchased

## 7. Navigation Structure

### 7.1 Primary Navigation

We'll maintain the starter kit's navigation structure while adding our specific sections:

- **Dashboard**: Overview and key metrics
- **Automations**: List and management of all automations
- **Credits**: Balance, usage, and purchasing
- **Settings**: User preferences and account settings

### 7.2 Secondary Navigation

- **Automation Details**: Accessed from automation list
- **Execution History**: Accessible from automation details
- **Credit Transaction History**: Accessed from credits page
- **Credit Packages**: Tab within credits page

### 7.3 Contextual Navigation

- Breadcrumb navigation for deep pages
- "Back" buttons for moving up hierarchy
- Related content links where appropriate
- Quick links to relevant actions

## 8. Empty States and Loading States

### 8.1 Empty States

When no data is available, we provide helpful guidance:

- **No Automations**: "You don't have any automations yet. Contact us to set up your first automation."
- **No Execution History**: "This automation hasn't been run yet. Activate it to see execution data."
- **No Credit History**: "You haven't purchased any credits yet. Buy credits to start using automations."

Each empty state includes:
- Illustrative icon
- Clear explanatory text
- Call-to-action button for next steps
- Visual styling consistent with the overall design

### 8.2 Loading States

We use consistent loading patterns across the interface:

- **Skeleton Loaders**: For content areas during initial load
- **Spinner Animation**: For action buttons during processing
- **Progress Indicators**: For multi-step operations like purchases
- **Fade Transitions**: When refreshing already-loaded content

Loading states maintain size and proportion of the expected content to prevent layout shifts.

## 9. Feedback System

### 9.1 Toast Notifications

We use the starter kit's toast notification system for transient feedback:

- **Success Messages**: Green toast for completed actions
- **Error Messages**: Red toast for failed operations
- **Warning Messages**: Amber toast for important alerts
- **Information Messages**: Blue toast for general updates

Toasts appear in a consistent location and automatically dismiss after an appropriate duration.

### 9.2 Inline Validation

For form inputs and interactive elements:

- **Real-time Validation**: Immediate feedback as users type
- **Error States**: Clear indication of invalid inputs with explanatory text
- **Success States**: Visual confirmation when input is valid
- **Disabled States**: Clear visual indication when actions are unavailable

### 9.3 Confirmation Dialogs

For critical or irreversible actions:

- **Activation Confirmation**: When activating an automation with high credit cost
- **Deactivation Confirmation**: When stopping an active automation
- **Purchase Confirmation**: Before proceeding to payment
- **Account Changes**: When updating critical account settings

Dialogs use clear language, explain consequences, and provide distinct cancel/confirm options.

## 10. Color System and Status Indicators

### 10.1 Status Colors

We'll use a consistent color system for status indicators:

- **Success/Active**: Green (#10B981)
- **Warning/Pending**: Amber (#F59E0B)
- **Error/Failed**: Red (#EF4444)
- **Inactive/Disabled**: Gray (#6B7280)
- **Processing/Loading**: Blue (#3B82F6)

### 10.2 Credit Balance Indicators

Credit balance uses a multi-level color system:

- **Healthy**: Green (sufficient credits)
- **Moderate**: Blue (moderately low)
- **Low**: Amber (running low, purchase recommended)
- **Critical**: Red (very low or depleted)

### 10.3 Chart and Visualization Colors

Data visualizations use a carefully selected palette:

- **Primary Data Series**: Brand teal
- **Secondary Data Series**: Brand blue
- **Tertiary Data Series**: Brand purple
- **Comparative Data**: Amber
- **Background Elements**: Light gray/dark gray (mode-dependent)

## 11. Typography Hierarchy

We'll maintain the starter kit's typography system with these specific uses:

### 11.1 Headings

- **Page Titles**: 24px/1.5em, bold
- **Section Headers**: 20px/1.5em, semibold
- **Card Headers**: 18px/1.5em, semibold
- **Group Labels**: 16px/1.5em, medium

### 11.2 Body Text

- **Primary Content**: 16px/1.5em, regular
- **Secondary Content**: 14px/1.5em, regular
- **Supporting Text**: 13px/1.5em, regular
- **Metadata**: 12px/1.5em, regular

### 11.3 Interactive Elements

- **Button Labels**: 14px, medium
- **Navigation Items**: 14px, medium
- **Form Labels**: 14px, medium
- **Toast Messages**: 14px, regular

## 12. Accessibility Considerations

### 12.1 Color and Contrast

- Maintain WCAG AA compliance (4.5:1 contrast ratio)
- Never rely solely on color for conveying information
- Support both light and dark modes with appropriate contrast

### 12.2 Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Implement logical tab order throughout interface
- Provide visible focus indicators
- Support keyboard shortcuts for common actions

### 12.3 Screen Reader Support

- Use semantic HTML elements
- Include appropriate ARIA attributes
- Provide alt text for all visual elements
- Ensure dynamic content changes are announced

### 12.4 Reduced Motion

- Respect user preferences for reduced motion
- Provide alternative non-animated states
- Keep essential animations subtle and purposeful

## 13. Implementation Guidelines

### 13.1 Component Usage

Leverage the starter kit's existing UI components:

- **Card**: For containing grouped information (automations, credit packages)
- **Button**: For primary and secondary actions
- **Switch**: For toggling automation status
- **Badge**: For status indicators
- **Dialog**: For confirmations and modals
- **Toast**: For notifications and alerts
- **Tabs**: For organizing related content
- **Form Elements**: For input and configuration

### 13.2 Adding New Components

When creating new components:

- Follow the starter kit's component architecture
- Maintain consistent styling patterns
- Ensure dark/light mode compatibility
- Document component variants and props
- Test across responsive breakpoints

### 13.3 Layout Patterns

Adhere to established layout patterns:

- Use consistent page structures
- Maintain padding and margin rhythm
- Follow grid system for alignment
- Create visual hierarchy through layout
- Ensure responsive behavior matches starter kit patterns

## 14. User Testing Plan

### 14.1 Testing Objectives

- Validate the intuitiveness of automation management
- Ensure the credit system is easily understood
- Confirm that status information is clear and meaningful
- Verify that error states provide helpful guidance

### 14.2 Key Test Scenarios

1. First-time user onboarding and credit purchase
2. Activating and monitoring automations
3. Handling insufficient credit scenarios
4. Interpreting execution history
5. Navigating between different sections

### 14.3 Success Metrics

- Task completion rate
- Time-on-task measurements
- Error frequency
- Subjective satisfaction ratings
- Comprehension of credit system