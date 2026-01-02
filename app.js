const { useState } = React;
const { Sparkles, TrendingUp, Rocket } = window.lucide;

const ResolutionChecker = () => {
  const [resolution, setResolution] = useState('');
  const [result, setResult] = useState(null);

  const analyzeResolution = (text) => {
    const lower = text.toLowerCase();
    
    const delusionalPatterns = [
      /become.*billionaire/i,
      /learn.*10.*languages/i,
      /read.*100.*books/i,
      /lose.*50.*pounds.*month/i,
      /write.*novel.*week/i,
      /run.*marathon.*never.*run/i,
      /quit.*job.*become.*influencer/i,
      /start.*5.*businesses/i,
      /become.*ceo/i,
      /viral/i,
      /famous/i,
      /perfect/i,
      /never.*again/i,
      /every.*day.*year/i,
      /completely.*change/i
    ];

    const optimisticPatterns = [
      /learn.*language/i,
      /run.*5k|10k/i,
      /read.*\d+.*book/i,
      /lose.*\d+.*pound/i,
      /save.*money/i,
      /start.*business/i,
      /write.*book/i,
      /get.*promotion/i,
      /learn.*code|program/i,
      /exercise.*week/i,
      /meditate/i
    ];

    const achievablePatterns = [
      /drink.*water/i,
      /sleep.*better/i,
      /call.*friend/i,
      /take.*walk/i,
      /read.*more/i,
      /cook.*home/i,
      /less.*social.*media/i,
      /organize/i,
      /journal/i,
      /stretch/i
    ];

    const responses = {
      delusional: [
        { 
          verdict: "Delusional (but we admire the confidence)", 
          message: "Listen, we love the energy. Truly. But maybe start with 'remember to floss' and work your way up?",
          advice: "Reality check: Rome wasn't built in a day, and neither is whatever you're planning."
        },
        { 
          verdict: "Delusional (but we admire the confidence)", 
          message: "That's... certainly a goal. Did a motivational Instagram post write this?",
          advice: "Pro tip: If your resolution needs a lottery win to succeed, it might need workshopping."
        },
        { 
          verdict: "Delusional (but we admire the confidence)", 
          message: "Okay Tony Robbins, let's pump the brakes. This is giving 'peaked during vision board workshop' vibes.",
          advice: "Consider: What if we aimed for 'functional human' first?"
        }
      ],
      optimistic: [
        { 
          verdict: "Optimistic but possible", 
          message: "This could actually happen! Will it? Well, that's between you and your future therapy bill.",
          advice: "You'll need discipline, accountability, and probably several existential crises. But sure, why not?"
        },
        { 
          verdict: "Optimistic but possible", 
          message: "Not impossible. Just... improbable. Like finishing a project before the deadline.",
          advice: "Break this down into smaller steps, or you'll be repeating this same resolution next January."
        },
        { 
          verdict: "Optimistic but possible", 
          message: "Ambitious! You might actually pull this off if you can defeat your true enemy: yourself.",
          advice: "Set reminders. Like, so many reminders. And find an accountability partner who won't let you weasel out."
        }
      ],
      achievable: [
        { 
          verdict: "Actually achievable", 
          message: "Look at you being all reasonable and realistic! You're either very wise or very tired.",
          advice: "This is genuinely doable. Don't overthink it. Just... actually do it this time?"
        },
        { 
          verdict: "Actually achievable", 
          message: "A resolution that doesn't require divine intervention? Revolutionary!",
          advice: "Start small, build consistency, and don't be weird about it if you miss a day."
        },
        { 
          verdict: "Actually achievable", 
          message: "Finally, someone who understands that sustainable change doesn't need to be dramatic.",
          advice: "You've got this. Seriously. It's basically already done. Just... keep doing it for 365 days."
        }
      ]
    };

    if (delusionalPatterns.some(pattern => pattern.test(text))) {
      return responses.delusional[Math.floor(Math.random() * responses.delusional.length)];
    } else if (optimisticPatterns.some(pattern => pattern.test(text))) {
      return responses.optimistic[Math.floor(Math.random() * responses.optimistic.length)];
    } else if (achievablePatterns.some(pattern => pattern.test(text))) {
      return responses.achievable[Math.floor(Math.random() * responses.achievable.length)];
    }

    if (text.split(' ').length > 15 || /!!!/.test(text)) {
      return responses.delusional[0];
    } else if (text.length > 50) {
      return responses.optimistic[1];
    } else {
      return responses.achievable[2];
    }
  };

  const handleSubmit = () => {
    if (resolution.trim()) {
      setResult(analyzeResolution(resolution));
    }
  };

  const getIcon = () => {
    if (!result) return null;
    if (result.verdict.includes('achievable')) return React.createElement('div', { className: 'text-5xl' }, '✅');
    if (result.verdict.includes('Optimistic')) return React.createElement('div', { className: 'text-5xl' }, '⚡');
    return React.createElement('div', { className: 'text-5xl' }, '🚀');
  };

  const getColor = () => {
    if (!result) return '';
    if (result.verdict.includes('achievable')) return 'border-green-500 bg-green-50';
    if (result.verdict.includes('Optimistic')) return 'border-yellow-500 bg-yellow-50';
    return 'border-purple-500 bg-purple-50';
  };

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6 flex items-center justify-center' },
    React.createElement(
      'div',
      { className: 'max-w-2xl w-full' },
      React.createElement(
        'div',
        { className: 'text-center mb-8' },
        React.createElement('h1', { className: 'text-4xl font-bold text-gray-800 mb-2' }, 'Resolution Reality Check'),
        React.createElement('p', { className: 'text-gray-600' }, "Let's be honest about your 2025 goals")
      ),
      React.createElement(
        'div',
        { className: 'mb-8' },
        React.createElement(
          'div',
          { className: 'bg-white rounded-lg shadow-lg p-6' },
          React.createElement(
            'label',
            { className: 'block text-sm font-medium text-gray-700 mb-2' },
            "What's your New Year's resolution?"
          ),
          React.createElement('textarea', {
            value: resolution,
            onChange: (e) => setResolution(e.target.value),
            placeholder: "e.g., 'Exercise 3 times a week' or 'Become a billionaire by March'",
            className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none',
            rows: 3
          }),
          React.createElement(
            'button',
            {
              onClick: handleSubmit,
              className: 'mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105'
            },
            'Check My Reality'
          )
        )
      ),
      result && React.createElement(
        'div',
        { className: `bg-white rounded-lg shadow-lg p-8 border-4 ${getColor()}` },
        React.createElement(
          'div',
          { className: 'flex flex-col items-center text-center' },
          React.createElement('div', { className: 'mb-4' }, getIcon()),
          React.createElement('h2', { className: 'text-2xl font-bold text-gray-800 mb-4' }, result.verdict),
          React.createElement('p', { className: 'text-lg text-gray-700 mb-4' }, result.message),
          React.createElement(
            'div',
            { className: 'bg-white bg-opacity-50 rounded-lg p-4 border-2 border-gray-200' },
            React.createElement('p', { className: 'text-sm font-medium text-gray-600' }, `💡 ${result.advice}`)
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'text-center mt-8 text-sm text-gray-500' },
        React.createElement('p', null, 'Made with brutal honesty and caffeine ☕')
      )
    )
  );
};

ReactDOM.render(React.createElement(ResolutionChecker), document.getElementById('root'));
